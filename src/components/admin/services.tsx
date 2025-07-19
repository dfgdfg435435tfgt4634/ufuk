import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Scissors, 
  Clock, 
  DollarSign,
  Edit,
  Trash2,
  Plus,
  Search,
  Star
} from 'lucide-react'
import { Button } from '../ui/button'

interface Service {
  id: number
  name: string
  description: string
  price: number
  duration: number
  category: string
  image: string
  isActive: boolean
  popularity: number
}

const mockServices: Service[] = [
  {
    id: 1,
    name: 'Klasik Saç Kesimi',
    description: 'Profesyonel saç kesimi ve şekillendirme',
    price: 150,
    duration: 30,
    category: 'Saç Kesimi',
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400',
    isActive: true,
    popularity: 85
  },
  {
    id: 2,
    name: 'Sakal Tıraşı',
    description: 'Geleneksel ustura ile sakal tıraşı',
    price: 100,
    duration: 20,
    category: 'Sakal',
    image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400',
    isActive: true,
    popularity: 70
  },
  {
    id: 3,
    name: 'Komple Bakım',
    description: 'Saç kesimi + sakal tıraşı + yüz bakımı',
    price: 200,
    duration: 60,
    category: 'Komple',
    image: 'https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=400',
    isActive: true,
    popularity: 90
  },
  {
    id: 4,
    name: 'Fade Kesim',
    description: 'Modern fade tekniği ile saç kesimi',
    price: 180,
    duration: 40,
    category: 'Saç Kesimi',
    image: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=400',
    isActive: true,
    popularity: 75
  },
  {
    id: 5,
    name: 'Saç Yıkama',
    description: 'Premium şampuan ile saç yıkama',
    price: 50,
    duration: 15,
    category: 'Bakım',
    image: 'https://images.pexels.com/photos/1570808/pexels-photo-1570808.jpeg?auto=compress&cs=tinysrgb&w=400',
    isActive: true,
    popularity: 60
  },
  {
    id: 6,
    name: 'Kaş Düzeltme',
    description: 'Profesyonel kaş şekillendirme',
    price: 75,
    duration: 15,
    category: 'Bakım',
    image: 'https://images.pexels.com/photos/1570809/pexels-photo-1570809.jpeg?auto=compress&cs=tinysrgb&w=400',
    isActive: true,
    popularity: 45
  }
]

const categories = ['Tümü', 'Saç Kesimi', 'Sakal', 'Bakım', 'Komple']

export default function Services() {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Tümü')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'Tümü' || service.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const toggleServiceStatus = (id: number) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id ? { ...service, isActive: !service.isActive } : service
      )
    )
  }

  const deleteService = (id: number) => {
    setServices(prev => prev.filter(service => service.id !== id))
  }

  const totalRevenue = services.reduce((sum, service) => sum + (service.price * service.popularity), 0)
  const averagePrice = services.reduce((sum, service) => sum + service.price, 0) / services.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hizmet Yönetimi</h1>
          <p className="text-gray-600">Salon hizmetlerini görüntüleyin ve yönetin</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Hizmet
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Toplam Hizmet', 
            value: services.length, 
            color: 'bg-blue-500',
            icon: Scissors
          },
          { 
            label: 'Aktif Hizmet', 
            value: services.filter(s => s.isActive).length, 
            color: 'bg-green-500',
            icon: Star
          },
          { 
            label: 'Ortalama Fiyat', 
            value: `₺${Math.round(averagePrice)}`, 
            color: 'bg-primary',
            icon: DollarSign
          },
          { 
            label: 'En Popüler', 
            value: services.reduce((max, service) => service.popularity > max.popularity ? service : max, services[0])?.name.split(' ')[0] || '-', 
            color: 'bg-purple-500',
            icon: Clock
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Hizmet adı veya açıklama ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  categoryFilter === category
                    ? 'bg-primary text-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Service Image */}
            <div className="relative h-48">
              <img 
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="bg-primary text-black px-2 py-1 rounded-full text-sm font-medium">
                  ₺{service.price}
                </span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {service.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </div>
            </div>

            {/* Service Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {service.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{service.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {service.duration} dk
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  %{service.popularity} popüler
                </div>
              </div>

              {/* Popularity Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Popülerlik</span>
                  <span>{service.popularity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${service.popularity}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleServiceStatus(service.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    service.isActive 
                      ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {service.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                </button>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-600 hover:text-gray-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteService(service.id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Scissors className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Hizmet bulunamadı</h3>
          <p className="text-gray-500">Arama kriterlerinize uygun hizmet bulunmuyor.</p>
        </div>
      )}
    </div>
  )
}