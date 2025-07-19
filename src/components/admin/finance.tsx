import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  CreditCard,
  PieChart,
  Download,
  Filter
} from 'lucide-react'
import { Button } from '../ui/button'

const mockFinanceData = {
  overview: {
    totalRevenue: 45230,
    monthlyRevenue: 12450,
    dailyAverage: 415,
    growth: 15.2
  },
  transactions: [
    { id: 1, customer: 'Ahmet Yılmaz', service: 'Klasik Kesim', amount: 150, date: '2024-01-15', method: 'Nakit' },
    { id: 2, customer: 'Mehmet Kaya', service: 'Sakal Tıraşı', amount: 100, date: '2024-01-15', method: 'Kart' },
    { id: 3, customer: 'Ali Demir', service: 'Komple Bakım', amount: 200, date: '2024-01-14', method: 'Nakit' },
    { id: 4, customer: 'Emre Şahin', service: 'Fade Kesim', amount: 180, date: '2024-01-14', method: 'Kart' },
    { id: 5, customer: 'Can Özkan', service: 'Saç Yıkama', amount: 50, date: '2024-01-13', method: 'Nakit' }
  ],
  serviceRevenue: [
    { service: 'Klasik Kesim', revenue: 18750, percentage: 41.5 },
    { service: 'Komple Bakım', revenue: 12000, percentage: 26.5 },
    { service: 'Fade Kesim', revenue: 7200, percentage: 15.9 },
    { service: 'Sakal Tıraşı', revenue: 5280, percentage: 11.7 },
    { service: 'Diğer', revenue: 2000, percentage: 4.4 }
  ],
  monthlyData: [
    { month: 'Oca', revenue: 38500, expenses: 15200 },
    { month: 'Şub', revenue: 42300, expenses: 16800 },
    { month: 'Mar', revenue: 39800, expenses: 15900 },
    { month: 'Nis', revenue: 45200, expenses: 17100 },
    { month: 'May', revenue: 48900, expenses: 18200 },
    { month: 'Haz', revenue: 52100, expenses: 19500 }
  ]
}

export default function Finance() {
  const [dateRange, setDateRange] = useState('30d')
  const [paymentFilter, setPaymentFilter] = useState('all')

  const { overview, transactions, serviceRevenue, monthlyData } = mockFinanceData

  const filteredTransactions = transactions.filter(transaction => 
    paymentFilter === 'all' || transaction.method.toLowerCase() === paymentFilter
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finansal Yönetim</h1>
          <p className="text-gray-600">Gelir, gider ve finansal raporları görüntüleyin</p>
        </div>
        <div className="flex gap-2">
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
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: 'Toplam Ciro', 
            value: `₺${overview.totalRevenue.toLocaleString()}`, 
            change: `+${overview.growth}%`,
            changeType: 'positive',
            icon: DollarSign,
            color: 'bg-green-500'
          },
          { 
            label: 'Aylık Gelir', 
            value: `₺${overview.monthlyRevenue.toLocaleString()}`, 
            change: '+8.3%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'bg-blue-500'
          },
          { 
            label: 'Günlük Ortalama', 
            value: `₺${overview.dailyAverage}`, 
            change: '+12%',
            changeType: 'positive',
            icon: Calendar,
            color: 'bg-purple-500'
          },
          { 
            label: 'Kart Ödemeleri', 
            value: '68%', 
            change: '+5%',
            changeType: 'positive',
            icon: CreditCard,
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
        {/* Monthly Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Aylık Gelir Trendi</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div className="w-full space-y-1">
                  <div 
                    className="w-full bg-green-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(data.revenue / 60000) * 100}%` }}
                    title={`Gelir: ₺${data.revenue.toLocaleString()}`}
                  />
                  <div 
                    className="w-full bg-red-300 transition-all duration-500"
                    style={{ height: `${(data.expenses / 60000) * 80}%` }}
                    title={`Gider: ₺${data.expenses.toLocaleString()}`}
                  />
                </div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Gelir</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-300 rounded"></div>
              <span className="text-sm text-gray-600">Gider</span>
            </div>
          </div>
        </motion.div>

        {/* Service Revenue Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Hizmet Bazında Gelir</h3>
          <div className="space-y-4">
            {serviceRevenue.map((service, index) => (
              <div key={service.service} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900">{service.service}</span>
                  <span className="text-gray-600">₺{service.revenue.toLocaleString()} ({service.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === 0 ? 'bg-green-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-purple-500' :
                      index === 3 ? 'bg-orange-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">Son İşlemler</h3>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Tüm Ödemeler</option>
              <option value="nakit">Nakit</option>
              <option value="kart">Kart</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hizmet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ödeme Yöntemi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-black font-medium text-sm">
                          {transaction.customer.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{transaction.customer}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₺{transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.method === 'Nakit' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString('tr-TR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}