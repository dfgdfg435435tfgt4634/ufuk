"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Award, Users, Clock, Star } from 'lucide-react'
import { sectionVariants, cardVariants, textVariants } from '../animations/page-transition'

export default function About() {
  const features = [
    {
      icon: Users,
      title: "Uzman Kuaförler",
      description: "Yılların deneyimine sahip profesyonel kuaförlerimiz"
    },
    {
      icon: Clock,
      title: "Esnek Çalışma Saatleri", 
      description: "Pazartesi-Cumartesi 09:00-20:00 arası hizmetinizdeyiz"
    },
    {
      icon: Award,
      title: "Premium Ürünler",
      description: "Sadece en kaliteli saç ve sakal bakım ürünlerini kullanıyoruz"
    },
    {
      icon: Star,
      title: "Memnun Müşteriler",
      description: "Binlerce memnun müşteri ile hizmet vermeye devam ediyoruz"
    }
  ]

  return (
    <motion.section 
      id="hakkimizda" 
      className="section-padding bg-surface"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={textVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              <span className="text-primary">Hakkımızda</span>
            </h2>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              BIG BOSS, HAMZA ŞAHİN tarafından İzmir Buca'da kurulmuş premium erkek kuaförlük salonudur. 
              Modern teknikler ve geleneksel ustalık bir araya getirilerek, her müşterimize özel hizmet sunuyoruz.
            </p>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Kaliteli ürünler, deneyimli ekibimiz ve müşteri memnuniyeti odaklı yaklaşımımızla 
              İzmir'in en güvenilir kuaförlük markası olmayı hedefliyoruz.
            </p>

            <div className="space-y-4">
              {[
                "5+ yıllık sektör deneyimi",
                "1000+ memnun müşteri",
                "Premium kalite ürünler",
                "Hijyen ve temizlik önceliği"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-text-secondary">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={cardVariants}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Kuaför salonu iç mekan"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <motion.div
              variants={cardVariants}
              className="absolute -bottom-6 -left-6 bg-background border border-border rounded-xl p-6 shadow-2xl"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">5.0</div>
                <div className="text-sm text-text-secondary">Google Puanı</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="card text-center group cursor-pointer"
            >
              <div className="bg-primary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}