"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Star, Award, Users, Clock } from 'lucide-react'
import TypewriterText from '../animations/typewriter-text'

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="ana-sayfa" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Advanced Background Effects */}
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Kuaför salonu"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary">BIG BOSS</span>
            <br />
            <span className="text-text-primary">
              <TypewriterText 
                texts={["Premium Erkek Kuaförlük", "Profesyonel Saç Kesimi", "Kaliteli Hizmet"]}
                className="text-text-primary"
              />
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Profesyonel ekibimiz ve modern tekniklerimizle sizlere en iyi hizmeti sunuyoruz.
            <br />
            İzmir'in en prestijli erkek kuaförlük deneyimi.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          > 
            <Button 
              size="lg"
              onClick={() => scrollToSection('#randevu')}
              className="text-lg px-8 py-4"
            >
              Randevu Al
            </Button>
            <Button 
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('#hizmetler')}
              className="text-lg px-8 py-4"
            >
              Hizmetlerimiz
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-primary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">5.0</div>
              <div className="text-sm text-text-secondary">Müşteri Puanı</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-primary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-sm text-text-secondary">Mutlu Müşteri</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-primary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">5+</div>
              <div className="text-sm text-text-secondary">Yıl Deneyim</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-primary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">7/24</div>
              <div className="text-sm text-text-secondary">Randevu</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}