import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Calendar
} from 'lucide-react'

const mockAnalytics = {
  overview: {
    totalVisitors: 12547,
    pageViews: 45632,
    bounceRate: 32.5,
    avgSessionDuration: '3:24',
    conversionRate: 4.2
  },
  traffic: {
    organic: 45,
    direct: 30,
    social: 15,
    referral: 10
  },
  devices: {
    mobile: 65,
    desktop: 30,
    tablet: 5
  },
  topPages: [
    { page: 'Ana Sayfa', views: 15420, percentage: 33.8 },
    { page: 'Hizmetler', views: 8930, percentage: 19.6 },
    { page: 'Randevu', views: 7650, percentage: 16.8 },
    { page: 'Galeri', views: 6420, percentage: 14.1 },
    { page: 'Hakkımızda', views: 4210, percentage: 9.2 }
  ],
  weeklyData: [
    { day: 'Pzt', visitors: 1200, pageViews: 3400 },
    { day: 'Sal', visitors: 1450, pageViews: 4100 },
    { day: 'Çar', visitors: 1680, pageViews: 4800 },
    { day: 'Per', visitors: 1920, pageViews: 5200 },
    { day: 'Cum', visitors: 2100, pageViews: 5800 },
    { day: 'Cmt', visitors: 1800, pageViews: 4900 },
    { day: 'Paz', visitors: 1350, pageViews: 3600 }
  ]
}

export default function Analytics() {
  const [dateRange, setDateRange] = useState('7d')

  const { overview, traffic, devices, topPages, weeklyData } = mockAnalytics

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analitik</h1>
          <p className="text-gray-600">Website performansını ve ziyaretçi davranışlarını analiz edin</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="7d">Son 7 Gün</option>
          <option value="30d">Son 30 Gün</option>
          <option value="90d">Son 90 Gün</option>
          <option value="1y">Son 1 Yıl</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { 
            label: 'Toplam Ziyaretçi', 
            value: overview.totalVisitors.toLocaleString(), 
            change: '+12.5%',
            changeType: 'positive',
            icon: Users,
            color: 'bg-blue-500'
          },
          { 
            label: 'Sayfa Görüntüleme', 
            value: overview.pageViews.toLocaleString(), 
            change: '+8.3%',
            changeType: 'positive',
            icon: Eye,
            color: 'bg-green-500'
          },
          { 
            label: 'Çıkış Oranı', 
            value: `${overview.bounceRate}%`, 
            change: '-2.1%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'bg-orange-500'
          },
          { 
            label: 'Ort. Oturum Süresi', 
            value: overview.avgSessionDuration, 
            change: '+15s',
            changeType: 'positive',
            icon: Clock,
            color: 'bg-purple-500'
          },
          { 
            label: 'Dönüşüm Oranı', 
            value: `${overview.conversionRate}%`, 
            change: '+0.8%',
            changeType: 'positive',
            icon: BarChart3,
            color: 'bg-primary'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
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
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Traffic Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Haftalık Trafik</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {weeklyData.map((data, index) => (
              <div key={data.day} className="flex-1 flex flex-col items-center">
                <div className="w-full space-y-1">
                  <div 
                    className="w-full bg-primary rounded-t-lg transition-all duration-500"
                    style={{ height: `${(data.visitors / 2500) * 100}%` }}
                    title={`Ziyaretçi: ${data.visitors}`}
                  />
                  <div 
                    className="w-full bg-blue-300 transition-all duration-500"
                    style={{ height: `${(data.pageViews / 6000) * 80}%` }}
                    title={`Sayfa Görüntüleme: ${data.pageViews}`}
                  />
                </div>
                <span className="text-xs text-gray-600 mt-2">{data.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span className="text-sm text-gray-600">Ziyaretçi</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-300 rounded"></div>
              <span className="text-sm text-gray-600">Sayfa Görüntüleme</span>
            </div>
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Trafik Kaynakları</h3>
          <div className="space-y-4">
            {Object.entries(traffic).map(([source, percentage]) => (
              <div key={source} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 capitalize">
                    {source === 'organic' ? 'Organik Arama' :
                     source === 'direct' ? 'Doğrudan' :
                     source === 'social' ? 'Sosyal Medya' : 'Referans'}
                  </span>
                  <span className="text-gray-600">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      source === 'organic' ? 'bg-green-500' :
                      source === 'direct' ? 'bg-blue-500' :
                      source === 'social' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">En Çok Ziyaret Edilen Sayfalar</h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-primary text-black rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">{page.page}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{page.views.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{page.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Cihaz Dağılımı</h3>
          <div className="space-y-6">
            {Object.entries(devices).map(([device, percentage]) => {
              const Icon = device === 'mobile' ? Smartphone : device === 'desktop' ? Monitor : Globe
              return (
                <div key={device} className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900 capitalize">
                        {device === 'mobile' ? 'Mobil' : device === 'desktop' ? 'Masaüstü' : 'Tablet'}
                      </span>
                      <span className="text-gray-600">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Real-time Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Gerçek Zamanlı Aktivite</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Canlı</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">23</div>
            <div className="text-sm text-gray-600">Şu anda aktif kullanıcı</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">156</div>
            <div className="text-sm text-gray-600">Son 30 dakikada sayfa görüntüleme</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
            <div className="text-sm text-gray-600">Son 1 saatte randevu</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}