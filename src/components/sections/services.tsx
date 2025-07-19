"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Clock, Star } from 'lucide-react'
import { services } from '../../lib/utils'

export default function Services() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hizmetler" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            <span className="text-primary">Hizmetlerimiz</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Profesyonel ekibimiz ve kaliteli ürünlerimizle size en iyi hizmeti sunuyoruz. 
            Her hizmetimiz özenle planlanmış ve müşteri memnuniyeti odaklıdır.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(245, 158, 11, 0.2)"
              }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group overflow-hidden"
            >
              {/* Service Image */}
              <div className="relative mb-6 rounded-lg overflow-hidden">
                <motion.img 
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div 
                  className="absolute top-4 right-4 bg-primary text-black px-3 py-1 rounded-full font-semibold text-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.price}
                </motion.div>
              </div>

              {/* Service Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-text-secondary text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-primary fill-current" />
                    ))}
                  </div>
                </div>

                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => scrollToSection('#randevu')}
                >
                  Randevu Al
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-surface rounded-2xl p-12"
        >
          <h3 className="text-3xl font-bold text-text-primary mb-4 font-serif">
            Özel Bir Hizmet Mi Arıyorsunuz?
          </h3>
          <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
            Size özel paket hizmetler ve kombinasyonlar için bizimle iletişime geçin. 
            İhtiyaçlarınıza göre özel çözümler sunuyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => scrollToSection('#randevu')}>
              Randevu Al
            </Button>
            <Button variant="secondary" size="lg">
              Bizi Arayın
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}