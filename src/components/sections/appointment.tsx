import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Calendar, Clock, User, Phone, MessageSquare, CheckCircle } from 'lucide-react';

const services = [
  { id: 'klasik-kesim', name: 'Klasik Saç Kesimi', price: 150, duration: 30 },
  { id: 'sakal-trasi', name: 'Sakal Tıraşı', price: 100, duration: 20 },
  { id: 'komple-bakim', name: 'Komple Bakım', price: 200, duration: 60 },
  { id: 'sac-yikama', name: 'Saç Yıkama', price: 50, duration: 15 },
  { id: 'sac-sekillendirme', name: 'Saç Şekillendirme', price: 80, duration: 25 },
  { id: 'cilt-bakimi', name: 'Cilt Bakımı', price: 120, duration: 40 }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30'
];

export default function Appointment() {
  const [formData, setFormData] = useState({
    ad: '',
    telefon: '',
    tarih: '',
    saat: '',
    hizmet: '',
    notlar: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create WhatsApp message
    const selectedService = services.find(s => s.id === formData.hizmet);
    const message = `Merhaba! Randevu talebim:

Ad Soyad: ${formData.ad}
Telefon: ${formData.telefon}
Tarih: ${formData.tarih}
Saat: ${formData.saat}
Hizmet: ${selectedService?.name} (${selectedService?.price}₺)
${formData.notlar ? `Notlar: ${formData.notlar}` : ''}

Randevu onayı için bekliyorum.`;

    const whatsappUrl = `https://wa.me/905314918035?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Hide success message after 1.5 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        ad: '',
        telefon: '',
        tarih: '',
        saat: '',
        hizmet: '',
        notlar: ''
      });
    }, 1500);
  };

  const handleQuickCall = () => {
    window.location.href = 'tel:+905314918035';
  };

  const handleQuickWhatsApp = () => {
    const message = 'Merhaba! Randevu almak istiyorum. Bilgi alabilir miyim?';
    const whatsappUrl = `https://wa.me/905314918035?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Appointment Form */}
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
                WhatsApp'a yönlendiriliyorsunuz...
              </motion.div>
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
                  name="ad"
                  value={formData.ad}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="Adınız ve soyadınız"
                />
              </motion.div>

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
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="05XX XXX XX XX"
                />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-gray-300 mb-2 font-medium">
                    <Calendar className="inline mr-2" size={16} />
                    Tarih *
                  </label>
                  <input
                    type="date"
                    name="tarih"
                    value={formData.tarih}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-gray-300 mb-2 font-medium">
                    <Clock className="inline mr-2" size={16} />
                    Saat *
                  </label>
                  <select
                    name="saat"
                    value={formData.saat}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  >
                    <option value="">Saat seçin</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-300 mb-2 font-medium">
                  Hizmet *
                </label>
                <select
                  name="hizmet"
                  value={formData.hizmet}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                >
                  <option value="">Hizmet seçin</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.price}₺ ({service.duration} dk)
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-300 mb-2 font-medium">
                  Notlar (Opsiyonel)
                </label>
                <textarea
                  name="notlar"
                  value={formData.notlar}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors resize-none"
                  placeholder="Özel istekleriniz varsa belirtebilirsiniz"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 text-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'WhatsApp ile Randevu Al'}
                </Button>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}