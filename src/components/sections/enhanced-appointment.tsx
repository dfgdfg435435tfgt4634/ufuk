import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Calendar, Clock, User, Phone, MessageSquare, CheckCircle, Mail, AlertCircle } from 'lucide-react';
import { useRealTimeSync } from '../../hooks/useRealTimeSync';
import { apiClient } from '../../lib/api';

const services = [
  { id: 'klasik-kesim', name: 'Klasik Saç Kesimi', price: 150, duration: 30 },
  { id: 'sakal-trasi', name: 'Sakal Tıraşı', price: 100, duration: 20 },
  { id: 'komple-bakim', name: 'Komple Bakım', price: 200, duration: 60 },
  { id: 'fade-kesim', name: 'Fade Kesim', price: 180, duration: 40 },
  { id: 'sac-yikama', name: 'Saç Yıkama', price: 50, duration: 15 },
  { id: 'kas-duzeltme', name: 'Kaş Düzeltme', price: 75, duration: 15 }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30'
];

export default function EnhancedAppointment() {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableSlots, setAvailableSlots] = useState<string[]>(timeSlots);

  const { connectionStatus } = useRealTimeSync(false);

  useEffect(() => {
    // Load available time slots when date changes
    if (formData.date) {
      loadAvailableSlots(formData.date);
    }
  }, [formData.date]);

  const loadAvailableSlots = async (date: string) => {
    try {
      const appointments = await apiClient.getAppointments({ date });
      const bookedSlots = appointments
        .filter((apt: any) => apt.status !== 'cancelled')
        .map((apt: any) => apt.time);
      
      setAvailableSlots(timeSlots.filter(slot => !bookedSlots.includes(slot)));
    } catch (error) {
      console.error('Error loading available slots:', error);
      setAvailableSlots(timeSlots);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Ad soyad gereklidir';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon numarası gereklidir';
    } else if (!/^[0-9\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.date) {
      newErrors.date = 'Tarih seçiniz';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Geçmiş bir tarih seçemezsiniz';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Saat seçiniz';
    }

    if (!formData.service) {
      newErrors.service = 'Hizmet seçiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.createAppointment(formData);
      
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          customer_name: '',
          phone: '',
          email: '',
          date: '',
          time: '',
          service: '',
          notes: ''
        });
      }, 3000);

    } catch (error) {
      console.error('Error creating appointment:', error);
      setErrors({ submit: 'Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickCall = () => {
    window.location.href = 'tel:+905314918035';
  };

  const handleQuickWhatsApp = () => {
    const message = 'Merhaba! Randevu almak istiyorum. Bilgi alabilir miyim?';
    const whatsappUrl = `https://wa.me/905314918035?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const selectedService = services.find(s => s.id === formData.service);

  return (
    <section id="randevu" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Randevu <span className="text-yellow-500">Al</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Profesyonel hizmetimizden yararlanmak için hemen randevu alın
          </p>
          
          {/* Connection Status */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus.isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm text-gray-400">
              {connectionStatus.isConnected ? 'Gerçek zamanlı rezervasyon aktif' : 'Bağlantı kontrol ediliyor...'}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Appointment Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Calendar className="mr-3 text-yellow-500" />
              Randevu Formu
            </h3>

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                className="mb-6 p-4 bg-green-600 text-white rounded-lg flex items-center"
              >
                <CheckCircle className="mr-3" />
                <div>
                  <p className="font-semibold">Randevunuz başarıyla alındı!</p>
                  <p className="text-sm">En kısa sürede size dönüş yapacağız.</p>
                </div>
              </motion.div>
            )}

            {errors.submit && (
              <div className="mb-6 p-4 bg-red-600 text-white rounded-lg flex items-center">
                <AlertCircle className="mr-3" />
                <p>{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-300 mb-2 font-medium">
                  <User className="inline mr-2" size={16} />
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none transition-colors ${
                    errors.customer_name ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-yellow-500'
                  }`}
                  placeholder="Adınız ve soyadınız"
                />
                {errors.customer_name && (
                  <p className="mt-1 text-sm text-red-400">{errors.customer_name}</p>
                )}
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-gray-300 mb-2 font-medium">
                    <Phone className="inline mr-2" size={16} />
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-yellow-500'
                    }`}
                    placeholder="05XX XXX XX XX"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-gray-300 mb-2 font-medium">
                    <Mail className="inline mr-2" size={16} />
                    E-posta (Opsiyonel)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-yellow-500'
                    }`}
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-300 mb-2 font-medium">
                  Hizmet *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none transition-colors ${
                    errors.service ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-yellow-500'
                  }`}
                >
                  <option value="">Hizmet seçin</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - ₺{service.price} ({service.duration} dk)
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1 text-sm text-red-400">{errors.service}</p>
                )}
                {selectedService && (
                  <div className="mt-2 p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <strong>Seçilen Hizmet:</strong> {selectedService.name}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Fiyat:</strong> ₺{selectedService.price} | <strong>Süre:</strong> {selectedService.duration} dakika
                    </p>
                  </div>
                )}
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-gray-300 mb-2 font-medium">
                    <Calendar className="inline mr-2" size={16} />
                    Tarih *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.date ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-yellow-500'
                    }`}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-400">{errors.date}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-gray-300 mb-2 font-medium">
                    <Clock className="inline mr-2" size={16} />
                    Saat *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none transition-colors ${
                      errors.time ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-yellow-500'
                    }`}
                    disabled={!formData.date}
                  >
                    <option value="">Saat seçin</option>
                    {availableSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-400">{errors.time}</p>
                  )}
                  {formData.date && availableSlots.length === 0 && (
                    <p className="mt-1 text-sm text-yellow-400">Bu tarihte müsait saat bulunmuyor</p>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-300 mb-2 font-medium">
                  Notlar (Opsiyonel)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors resize-none"
                  placeholder="Özel istekleriniz varsa belirtebilirsiniz"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting || !connectionStatus.isConnected}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Randevu Alınıyor...' : 'Randevu Al'}
                </Button>
                {!connectionStatus.isConnected && (
                  <p className="mt-2 text-sm text-red-400 text-center">
                    Bağlantı bekleniyor...
                  </p>
                )}
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">İletişim Bilgileri</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <Phone className="mr-3 text-yellow-500" />
                  <span>0531 491 80 35</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MessageSquare className="mr-3 text-yellow-500" />
                  <span>WhatsApp ile 7/24 iletişim</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="mr-3 text-yellow-500" />
                  <span>Otomatik e-posta bildirimleri</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleQuickCall}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="mr-2" />
                  Hemen Ara
                </Button>
                
                <Button
                  onClick={handleQuickWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageSquare className="mr-2" />
                  WhatsApp ile Yaz
                </Button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Çalışma Saatleri</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Pazartesi - Cumartesi</span>
                  <span>09:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Pazar</span>
                  <span className="text-red-400">Kapalı</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Randevu Politikası</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Randevular en az 2 saat öncesinden iptal edilmelidir</li>
                <li>• Geç kalma durumunda randevu süresi kısalabilir</li>
                <li>• Randevu onayı telefon veya WhatsApp ile yapılır</li>
                <li>• Özel günlerde randevu saatleri değişebilir</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}