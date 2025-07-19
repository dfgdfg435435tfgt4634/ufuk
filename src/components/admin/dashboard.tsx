import React from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Star,
  Phone,
  Image
} from 'lucide-react'

const stats = [
  {
    title: 'Toplam Randevu',
    value: '1,247',
    change: '+12%',
    changeType: 'positive',
    icon: Calendar,
    color: 'bg-blue-500'
  },
  {
    title: 'Aktif Müşteri',
    value: '892',
    change: '+8%',
    changeType: 'positive',
    icon: Users,
    color: 'bg-green-500'
  },
  {
    title: 'Aylık Ciro',
    value: '₺45,230',
    change: '+15%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'bg-primary'
  },
  {
    title: 'Müşteri Memnuniyeti',
    value: '4.9/5',
    change: '+0.2',
    changeType: 'positive',
    icon: Star,
    color: 'bg-purple-500'
  }
]

const recentAppointments = [
  { id: 1, customer: 'Ahmet Yılmaz', service: 'Klasik Kesim', time: '14:30', status: 'confirmed' },
  { id: 2, customer: 'Mehmet Kaya', service: 'Sakal Tıraşı', time: '15:00', status: 'pending' },
  { id: 3, customer: 'Ali Demir', service: 'Komple Bakım', time: '15:30', status: 'confirmed' },
  { id: 4, customer: 'Emre Şahin', service: 'Fade Kesim', time: '16:00', status: 'completed' },
]

const quickActions = [
  { title: 'Yeni Randevu', icon: Calendar, color: 'bg-blue-500' },
  { title: 'Müşteri Ekle', icon: Users, color: 'bg-green-500' },
  { title: 'Galeri Güncelle', icon: Image, color: 'bg-purple-500' },
  { title: 'Rapor Oluştur', icon: TrendingUp, color: 'bg-orange-500' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-black"
      >
        <h1 className="text-2xl font-bold mb-2">Hoş Geldiniz, Hamza Şahin!</h1>
        <p className="opacity-90">BIG BOSS kuaför yönetim paneline hoş geldiniz. Bugün 8 randevunuz var.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bugünkü Randevular</h3>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-black font-medium text-sm">
                      {appointment.customer.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.customer}</p>
                    <p className="text-sm text-gray-600">{appointment.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{appointment.time}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status === 'confirmed' ? 'Onaylandı' :
                     appointment.status === 'pending' ? 'Bekliyor' : 'Tamamlandı'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={action.title}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-900">{action.title}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Haftalık Randevu Trendi</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 45, 78, 52, 89, 67, 43].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary rounded-t-lg transition-all duration-500"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-600 mt-2">
                  {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][index]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popüler Hizmetler</h3>
          <div className="space-y-4">
            {[
              { name: 'Klasik Kesim', percentage: 45, color: 'bg-blue-500' },
              { name: 'Sakal Tıraşı', percentage: 30, color: 'bg-green-500' },
              { name: 'Komple Bakım', percentage: 15, color: 'bg-primary' },
              { name: 'Fade Kesim', percentage: 10, color: 'bg-purple-500' },
            ].map((service) => (
              <div key={service.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900">{service.name}</span>
                  <span className="text-gray-600">{service.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${service.color} transition-all duration-500`}
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}