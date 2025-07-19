import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  Star,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter
} from 'lucide-react'
import { Button } from '../ui/button'

interface Customer {
  id: number
  name: string
  phone: string
  email?: string
  totalAppointments: number
  totalSpent: number
  lastVisit: string
  rating: number
  notes?: string
  joinDate: string
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    phone: '0532 123 45 67',
    email: 'ahmet@email.com',
    totalAppointments: 15,
    totalSpent: 2250,
    lastVisit: '2024-01-10',
    rating: 5,
    joinDate: '2023-06-15',
    notes: 'Düzenli müşteri, yanları kısa sever'
  },
  {
    id: 2,
    name: 'Mehmet Kaya',
    phone: '0533 234 56 78',
    email: 'mehmet@email.com',
    totalAppointments: 8,
    totalSpent: 1200,
    lastVisit: '2024-01-08',
    rating: 4,
    joinDate: '2023-09-20'
  },
  {
    id: 3,
    name: 'Ali Demir',
    phone: '0534 345 67 89',
    totalAppointments: 22,
    totalSpent: 4400,
    lastVisit: '2024-01-12',
    rating: 5,
    joinDate: '2023-03-10',
    notes: 'VIP müşteri, özel ilgi göster'
  },
  {
    id: 4,
    name: 'Emre Şahin',
    phone: '0535 456 78 90',
    email: 'emre@email.com',
    totalAppointments: 5,
    totalSpent: 750,
    lastVisit: '2024-01-05',
    rating: 4,
    joinDate: '2023-11-01'
  }
]

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<string>('name')

  const filteredCustomers = customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'totalSpent':
          return b.totalSpent - a.totalSpent
        case 'totalAppointments':
          return b.totalAppointments - a.totalAppointments
        case 'lastVisit':
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
        default:
          return 0
      }
    })

  const deleteCustomer = (id: number) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id))
  }

  const getCustomerLevel = (totalSpent: number) => {
    if (totalSpent >= 3000) return { level: 'VIP', color: 'bg-purple-100 text-purple-800' }
    if (totalSpent >= 1500) return { level: 'Gold', color: 'bg-yellow-100 text-yellow-800' }
    if (totalSpent >= 500) return { level: 'Silver', color: 'bg-gray-100 text-gray-800' }
    return { level: 'Bronze', color: 'bg-orange-100 text-orange-800' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Müşteri Yönetimi</h1>
          <p className="text-gray-600">Müşteri bilgilerini görüntüleyin ve yönetin</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Müşteri
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Toplam Müşteri', 
            value: customers.length, 
            color: 'bg-blue-500',
            icon: Users
          },
          { 
            label: 'VIP Müşteri', 
            value: customers.filter(c => c.totalSpent >= 3000).length, 
            color: 'bg-purple-500',
            icon: Star
          },
          { 
            label: 'Ortalama Harcama', 
            value: `₺${Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}`, 
            color: 'bg-green-500',
            icon: Calendar
          },
          { 
            label: 'Aktif Müşteri', 
            value: customers.filter(c => {
              const lastVisit = new Date(c.lastVisit)
              const thirtyDaysAgo = new Date()
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
              return lastVisit > thirtyDaysAgo
            }).length, 
            color: 'bg-orange-500',
            icon: Phone
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
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Müşteri adı, telefon veya email ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="name">İsme Göre</option>
              <option value="totalSpent">Harcamaya Göre</option>
              <option value="totalAppointments">Randevu Sayısına Göre</option>
              <option value="lastVisit">Son Ziyarete Göre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const customerLevel = getCustomerLevel(customer.totalSpent)
          return (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Customer Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-black font-medium">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${customerLevel.color}`}>
                      {customerLevel.level}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteCustomer(customer.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {customer.phone}
                </div>
                {customer.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {customer.email}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{customer.totalAppointments}</div>
                  <div className="text-xs text-gray-600">Randevu</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">₺{customer.totalSpent}</div>
                  <div className="text-xs text-gray-600">Toplam</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < customer.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({customer.rating}/5)</span>
                </div>
              </div>

              {/* Last Visit */}
              <div className="text-sm text-gray-600 mb-4">
                Son ziyaret: {new Date(customer.lastVisit).toLocaleDateString('tr-TR')}
              </div>

              {/* Notes */}
              {customer.notes && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{customer.notes}</p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Müşteri bulunamadı</h3>
          <p className="text-gray-500">Arama kriterlerinize uygun müşteri bulunmuyor.</p>
        </div>
      )}
    </div>
  )
}