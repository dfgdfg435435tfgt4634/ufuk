const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Initialize Supabase (you'll need to add your credentials)
const supabase = createClient(
  process.env.SUPABASE_URL || 'your-supabase-url',
  process.env.SUPABASE_ANON_KEY || 'your-supabase-key'
);

// Email configuration
const emailTransporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Twilio configuration
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// File upload configuration
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Real-time connection management
const connectedClients = new Map();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  connectedClients.set(socket.id, { connectedAt: new Date() });

  socket.on('join-admin', () => {
    socket.join('admin-room');
    console.log('Admin joined:', socket.id);
  });

  socket.on('join-public', () => {
    socket.join('public-room');
    console.log('Public user joined:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    connectedClients.delete(socket.id);
  });
});

// Content Management API
app.get('/api/content', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('section', { ascending: true });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.put('/api/content/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, title } = req.body;

    const { data, error } = await supabase
      .from('content')
      .update({ content, title, updated_at: new Date() })
      .eq('id', id)
      .select();

    if (error) throw error;

    // Broadcast update to all connected clients
    io.emit('content-updated', { id, content, title });

    res.json(data[0]);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

app.post('/api/content', async (req, res) => {
  try {
    const { section, key, content, title, type = 'text' } = req.body;

    const { data, error } = await supabase
      .from('content')
      .insert([{ section, key, content, title, type, created_at: new Date() }])
      .select();

    if (error) throw error;

    // Broadcast new content to all connected clients
    io.emit('content-created', data[0]);

    res.json(data[0]);
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
});

// Image Management API
app.post('/api/images/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const filename = `${uuidv4()}-${Date.now()}.webp`;
    const filepath = path.join('uploads', filename);

    // Ensure uploads directory exists
    await fs.mkdir('uploads', { recursive: true });

    // Process and optimize image
    await sharp(req.file.buffer)
      .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(filepath);

    const imageUrl = `/uploads/${filename}`;

    // Save to database
    const { data, error } = await supabase
      .from('images')
      .insert([{
        filename,
        original_name: req.file.originalname,
        url: imageUrl,
        size: req.file.size,
        created_at: new Date()
      }])
      .select();

    if (error) throw error;

    // Broadcast new image to admin clients
    io.to('admin-room').emit('image-uploaded', data[0]);

    res.json(data[0]);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.get('/api/images', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.delete('/api/images/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Get image info first
    const { data: image, error: fetchError } = await supabase
      .from('images')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Delete file from filesystem
    const filepath = path.join('uploads', image.filename);
    try {
      await fs.unlink(filepath);
    } catch (fileError) {
      console.warn('File not found on filesystem:', filepath);
    }

    // Delete from database
    const { error } = await supabase
      .from('images')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Broadcast deletion to admin clients
    io.to('admin-room').emit('image-deleted', { id });

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// Appointment Management API
app.get('/api/appointments', async (req, res) => {
  try {
    const { status, date, limit = 50 } = req.query;
    
    let query = supabase
      .from('appointments')
      .select('*')
      .order('date', { ascending: true })
      .limit(parseInt(limit));

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (date) {
      query = query.gte('date', date);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { customer_name, phone, email, service, date, time, notes } = req.body;

    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        customer_name,
        phone,
        email,
        service,
        date,
        time,
        notes,
        status: 'pending',
        created_at: new Date()
      }])
      .select();

    if (error) throw error;

    // Broadcast new appointment to admin clients
    io.to('admin-room').emit('appointment-created', data[0]);

    // Send confirmation email if email provided
    if (email) {
      try {
        await emailTransporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Randevu Talebiniz Alındı - BIG BOSS',
          html: `
            <h2>Randevu Talebiniz Alındı</h2>
            <p>Sayın ${customer_name},</p>
            <p>Randevu talebiniz başarıyla alınmıştır. Detaylar:</p>
            <ul>
              <li><strong>Hizmet:</strong> ${service}</li>
              <li><strong>Tarih:</strong> ${date}</li>
              <li><strong>Saat:</strong> ${time}</li>
            </ul>
            <p>En kısa sürede size dönüş yapacağız.</p>
            <p>BIG BOSS Premium Kuaför</p>
          `
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    res.json(data[0]);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const { data, error } = await supabase
      .from('appointments')
      .update({ status, notes, updated_at: new Date() })
      .eq('id', id)
      .select();

    if (error) throw error;

    // Broadcast update to all connected clients
    io.emit('appointment-updated', data[0]);

    // Send notification if status changed to cancelled
    if (status === 'cancelled') {
      const appointment = data[0];
      
      // Send SMS if phone number available
      if (appointment.phone && process.env.TWILIO_PHONE_NUMBER) {
        try {
          await twilioClient.messages.create({
            body: `BIG BOSS: ${appointment.date} ${appointment.time} tarihli randevunuz iptal edilmiştir. Bilgi: 0531 491 80 35`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: appointment.phone
          });
        } catch (smsError) {
          console.error('SMS sending failed:', smsError);
        }
      }

      // Send email if email available
      if (appointment.email) {
        try {
          await emailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: appointment.email,
            subject: 'Randevu İptali - BIG BOSS',
            html: `
              <h2>Randevu İptali</h2>
              <p>Sayın ${appointment.customer_name},</p>
              <p>${appointment.date} ${appointment.time} tarihli randevunuz iptal edilmiştir.</p>
              <p>Yeni randevu için bizimle iletişime geçebilirsiniz.</p>
              <p>BIG BOSS Premium Kuaför<br>Tel: 0531 491 80 35</p>
            `
          });
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
        }
      }
    }

    res.json(data[0]);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

app.delete('/api/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Broadcast deletion to admin clients
    io.to('admin-room').emit('appointment-deleted', { id });

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

// System status API
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    connectedClients: connectedClients.size,
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});