import React from 'react'
import { Scissors, Phone, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <Scissors className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary font-serif">BIG BOSS</h3>
                <p className="text-sm text-text-secondary">Premium Kuaför</p>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              İzmir'in en prestijli erkek kuaförlük salonu. Profesyonel hizmet ve kaliteli ürünlerle sizlere hizmet veriyoruz.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-text-primary">Hızlı Linkler</h4>
            <ul className="space-y-2">
              {['Ana Sayfa', 'Hizmetler', 'Galeri', 'Hakkımızda', 'Randevu'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-text-primary">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-text-secondary text-sm">0532 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-text-secondary text-sm">İzmir, Buca</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-text-secondary text-sm">Pzt-Cmt: 09:00-20:00</span>
              </div>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-text-primary">Sosyal Medya</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-surface-light p-3 rounded-lg hover:bg-primary hover:text-black transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-surface-light p-3 rounded-lg hover:bg-primary hover:text-black transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-surface-light p-3 rounded-lg hover:bg-primary hover:text-black transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-text-secondary text-sm">
              Bizi takip edin ve son çalışmalarımızı görün!
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm">
              © 2024 BIG BOSS Premium Kuaför. Tüm hakları saklıdır.
            </p>
            <p className="text-text-secondary text-sm mt-2 md:mt-0">
              HAMZA ŞAHİN tarafından kurulmuştur.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}