-- Database schema for BIG BOSS Admin Panel
-- This file contains the SQL commands to create all necessary tables

-- Content Management Table
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(100) NOT NULL,
  key VARCHAR(100) NOT NULL,
  title VARCHAR(255),
  content TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'text' CHECK (type IN ('text', 'html', 'image')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section, key)
);

-- Images Table
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  size INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  service VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers Table (for customer management)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  total_appointments INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  last_visit DATE,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  category VARCHAR(100),
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  popularity INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- System Logs Table (for monitoring)
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level VARCHAR(20) NOT NULL CHECK (level IN ('info', 'warning', 'error', 'debug')),
  message TEXT NOT NULL,
  context JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_section ON content(section);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_system_logs_level ON system_logs(level);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at);

-- Insert default content
INSERT INTO content (section, key, title, content, type) VALUES
('hero', 'title', 'Ana Sayfa Başlık', 'BIG BOSS Premium Erkek Kuaförlük', 'text'),
('hero', 'subtitle', 'Ana Sayfa Alt Başlık', 'Profesyonel ekibimiz ve modern tekniklerimizle sizlere en iyi hizmeti sunuyoruz.', 'text'),
('about', 'title', 'Hakkımızda Başlık', 'Hakkımızda', 'text'),
('about', 'content', 'Hakkımızda İçerik', 'BIG BOSS, HAMZA ŞAHİN tarafından İzmir Buca''da kurulmuş premium erkek kuaförlük salonudur. Modern teknikler ve geleneksel ustalık bir araya getirilerek, her müşterimize özel hizmet sunuyoruz.', 'html'),
('contact', 'phone', 'İletişim Telefonu', '0531 491 80 35', 'text'),
('contact', 'address', 'Salon Adresi', 'İzmir, Buca', 'text'),
('contact', 'hours', 'Çalışma Saatleri', 'Pazartesi - Cumartesi: 09:00 - 20:00\nPazar: Kapalı', 'text')
ON CONFLICT (section, key) DO NOTHING;

-- Insert default services
INSERT INTO services (name, description, price, duration, category, is_active, popularity) VALUES
('Klasik Saç Kesimi', 'Profesyonel saç kesimi ve şekillendirme', 150.00, 30, 'Saç Kesimi', true, 85),
('Sakal Tıraşı', 'Geleneksel ustura ile sakal tıraşı', 100.00, 20, 'Sakal', true, 70),
('Komple Bakım', 'Saç kesimi + sakal tıraşı + yüz bakımı', 200.00, 60, 'Komple', true, 90),
('Fade Kesim', 'Modern fade tekniği ile saç kesimi', 180.00, 40, 'Saç Kesimi', true, 75),
('Saç Yıkama', 'Premium şampuan ile saç yıkama', 50.00, 15, 'Bakım', true, 60),
('Kaş Düzeltme', 'Profesyonel kaş şekillendirme', 75.00, 15, 'Bakım', true, 45)
ON CONFLICT DO NOTHING;