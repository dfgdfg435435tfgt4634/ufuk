import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Edit, 
  Save,
  Eye,
  Palette,
  Type,
  Image,
  Settings
} from 'lucide-react'
import { Button } from '../ui/button'

interface ContentSection {
  id: string
  title: string
  content: string
  type: 'text' | 'html' | 'image'
  isEditing: boolean
}

const mockContent: ContentSection[] = [
  {
    id: 'hero-title',
    title: 'Ana Sayfa Başlık',
    content: 'BIG BOSS Premium Erkek Kuaförlük',
    type: 'text',
    isEditing: false
  },
  {
    id: 'hero-subtitle',
    title: 'Ana Sayfa Alt Başlık',
    content: 'Profesyonel ekibimiz ve modern tekniklerimizle sizlere en iyi hizmeti sunuyoruz.',
    type: 'text',
    isEditing: false
  },
  {
    id: 'about-content',
    title: 'Hakkımızda İçeriği',
    content: 'BIG BOSS, HAMZA ŞAHİN tarafından İzmir Buca\'da kurulmuş premium erkek kuaförlük salonudur. Modern teknikler ve geleneksel ustalık bir araya getirilerek, her müşterimize özel hizmet sunuyoruz.',
    type: 'html',
    isEditing: false
  },
  {
    id: 'contact-phone',
    title: 'İletişim Telefonu',
    content: '0531 491 80 35',
    type: 'text',
    isEditing: false
  },
  {
    id: 'contact-address',
    title: 'Salon Adresi',
    content: 'İzmir, Buca',
    type: 'text',
    isEditing: false
  },
  {
    id: 'working-hours',
    title: 'Çalışma Saatleri',
    content: 'Pazartesi - Cumartesi: 09:00 - 20:00\nPazar: Kapalı',
    type: 'text',
    isEditing: false
  }
]

const colorPalette = {
  primary: '#F59E0B',
  primaryDark: '#D97706',
  primaryLight: '#FCD34D',
  background: '#000000',
  surface: '#111827',
  surfaceLight: '#1F2937',
  textPrimary: '#FFFFFF',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF'
}

export default function ContentManagement() {
  const [content, setContent] = useState<ContentSection[]>(mockContent)
  const [colors, setColors] = useState(colorPalette)
  const [activeTab, setActiveTab] = useState<'content' | 'colors' | 'fonts'>('content')

  const toggleEdit = (id: string) => {
    setContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    )
  }

  const updateContent = (id: string, newContent: string) => {
    setContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, content: newContent, isEditing: false } : item
      )
    )
  }

  const updateColor = (colorKey: string, newColor: string) => {
    setColors(prev => ({ ...prev, [colorKey]: newColor }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">İçerik Yönetimi</h1>
          <p className="text-gray-600">Website içeriklerini ve tasarımını yönetin</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Değişiklikleri Kaydet
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'content', label: 'İçerik', icon: FileText },
              { id: 'colors', label: 'Renkler', icon: Palette },
              { id: 'fonts', label: 'Yazı Tipleri', icon: Type }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              {content.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleEdit(item.id)}
                      >
                        {item.isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                        {item.isEditing ? 'Kaydet' : 'Düzenle'}
                      </Button>
                    </div>
                  </div>

                  {item.isEditing ? (
                    <div className="space-y-4">
                      {item.type === 'text' ? (
                        <textarea
                          value={item.content}
                          onChange={(e) => setContent(prev => 
                            prev.map(c => c.id === item.id ? { ...c, content: e.target.value } : c)
                          )}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          rows={3}
                        />
                      ) : (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">HTML İçerik</label>
                          <textarea
                            value={item.content}
                            onChange={(e) => setContent(prev => 
                              prev.map(c => c.id === item.id ? { ...c, content: e.target.value } : c)
                            )}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                            rows={6}
                          />
                        </div>
                      )}
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleEdit(item.id)}
                        >
                          İptal
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateContent(item.id, item.content)}
                        >
                          Kaydet
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4">
                      {item.type === 'html' ? (
                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                      ) : (
                        <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(colors).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div 
                        className="w-8 h-8 rounded-lg border border-gray-300"
                        style={{ backgroundColor: value }}
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-gray-500">{value}</p>
                      </div>
                    </div>
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => updateColor(key, e.target.value)}
                      className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                    />
                  </motion.div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Renk Önizlemesi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: colors.background, color: colors.textPrimary }}
                  >
                    <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                      BIG BOSS
                    </h4>
                    <p style={{ color: colors.textSecondary }}>
                      Premium Erkek Kuaförlük
                    </p>
                    <button 
                      className="mt-4 px-4 py-2 rounded-lg font-medium"
                      style={{ backgroundColor: colors.primary, color: colors.background }}
                    >
                      Randevu Al
                    </button>
                  </div>
                  <div 
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: colors.surface, color: colors.textPrimary }}
                  >
                    <h4 className="text-lg font-semibold mb-2">Hizmetlerimiz</h4>
                    <p style={{ color: colors.textSecondary }} className="mb-4">
                      Profesyonel saç kesimi ve bakım hizmetleri
                    </p>
                    <div 
                      className="p-3 rounded border"
                      style={{ 
                        backgroundColor: colors.surfaceLight, 
                        borderColor: colors.primary + '40' 
                      }}
                    >
                      <span style={{ color: colors.primary }}>Klasik Kesim - ₺150</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fonts Tab */}
          {activeTab === 'fonts' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ana Font (Inter)</h3>
                  <div className="space-y-3">
                    <div className="font-normal">Normal: The quick brown fox</div>
                    <div className="font-medium">Medium: The quick brown fox</div>
                    <div className="font-semibold">Semibold: The quick brown fox</div>
                    <div className="font-bold">Bold: The quick brown fox</div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    Font Değiştir
                  </Button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Başlık Fontu (Playfair Display)</h3>
                  <div className="space-y-3 font-serif">
                    <div className="font-normal">Normal: The quick brown fox</div>
                    <div className="font-semibold">Semibold: The quick brown fox</div>
                    <div className="font-bold">Bold: The quick brown fox</div>
                    <div className="font-black">Black: The quick brown fox</div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    Font Değiştir
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Boyutları</h3>
                <div className="space-y-4">
                  <div className="text-xs">12px - Çok küçük metin</div>
                  <div className="text-sm">14px - Küçük metin</div>
                  <div className="text-base">16px - Normal metin</div>
                  <div className="text-lg">18px - Büyük metin</div>
                  <div className="text-xl">20px - Çok büyük metin</div>
                  <div className="text-2xl">24px - Küçük başlık</div>
                  <div className="text-3xl">30px - Orta başlık</div>
                  <div className="text-4xl">36px - Büyük başlık</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}