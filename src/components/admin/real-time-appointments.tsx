import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Mail,
  MessageSquare,
  AlertCircle
} from 'lucide-react'
import { Button } from '../ui/button'
import { useRealTimeSync } from '../../hooks/useRealTimeSync'
import { apiClient } from '../../lib/api'

interface Appointment {
  id: string
  customer_name: string
  phone: string
  email?: string
  service: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at?: string
}

export default function RealTimeAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())

  const { connectionStatus, subscribe } = useRealTimeSync(true)

  useEffect(() => {
    loadAppointments()
  }, [statusFilter, dateFilter])

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribeCreated = subscribe('appointment-created', (appointment: Appointment) => {
      setAppointments(prev => [appointment, ...prev])
      showNotification('Yeni randevu alındı!', 'success')
    })

    const unsubscribeUpdated = subscribe('appointment-updated', (appointment: Appointment) => {
      setAppointments(prev => 
        prev.map(apt => apt.id === appointment.id ? appointment : apt)
      )
      showNotification('Randevu güncellendi', 'info')
    })

    const unsubscribeDeleted = subscribe('appointment-deleted', ({ id }: { id: string }) => {
      setAppointments(prev => prev.filter(apt => apt.id !== id))
      showNotification('Randevu silindi', 'warning')
    })

    return () => {
      unsubscribeCreated()
      unsubscribeUpdated()
      unsubscribeDeleted()
    }
  }, [subscribe])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const filters: any = {}
      if (statusFilter !== 'all') filters.status = statusFilter
      if (dateFilter) filters.date = dateFilter
      
      const data = await apiClient.getAppointments(filters)
      setAppointments(data)
    } catch (error) {
      console.error('Error loading appointments:', error)
      showNotification('Randevular yüklenirken hata oluştu', 'error')
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    if (processingIds.has(id)) return

    try {
      setProcessingIds(prev => new Set(prev).add(id))
      await apiClient.updateAppointment(id, { status })
      showNotification(`Randevu ${getStatusText(status)} olarak işaretlendi`, 'success')
    } catch (error) {
      console.error('Error updating appointment:', error)
      showNotification('Randevu güncellenirken hata oluştu', 'error')
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const deleteAppointment = async (id: string) => {
    if (!confirm('Bu randevuyu silmek istediğinizden emin misiniz?')) return

    try {
      setProcessingIds(prev => new Set(prev).add(id))
      await apiClient.deleteAppointment(id)
    } catch (error) {
      console.error('Error deleting appointment:', error)
      showNotification('Randevu silinirken hata oluştu', 'error')
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    // You can implement a toast notification system here
    console.log(`${type.toUpperCase()}: ${message}`)
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.phone.includes(searchTerm) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Onaylandı'
      case 'pending': return 'Bekliyor'
      case 'completed': return 'Tamamlandı'
      case 'cancelled': return 'İptal'
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-600" />
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Randevu Yönetimi</h1>
          <p className="text-gray-600">Gerçek zamanlı randevu takibi ve yönetimi</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            connectionStatus.isConnected ? 'bg-green-500' : 
            connectionStatus.isReconnecting ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
          <span className="text-sm text-gray-600">
            {connectionStatus.isConnected ? 'Bağlı' : 
             connectionStatus.isReconnecting ? 'Bağlanıyor...' : 'Bağlantı Yok'}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Toplam', value: stats.total, color: 'bg-blue-500', icon: Calendar },
          { label: 'Bekleyen', value: stats.pending, color: 'bg-yellow-500', icon: Clock },
          { label: 'Onaylanan', value: stats.confirmed, color: 'bg-green-500', icon: CheckCircle },
          { label: 'Tamamlanan', value: stats.completed, color: 'bg-purple-500', icon: CheckCircle },
          { label: 'İptal', value: stats.cancelled, color: 'bg-red-500', icon: XCircle }
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
                placeholder="Müşteri adı, telefon veya hizmet ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="pending">Bekleyen</option>
              <option value="confirmed">Onaylanan</option>
              <option value="completed">Tamamlanan</option>
              <option value="cancelled">İptal</option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Randevular yükleniyor...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Müşteri
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İletişim
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hizmet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih & Saat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredAppointments.map((appointment) => (
                    <motion.tr
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-black font-medium text-sm">
                              {appointment.customer_name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{appointment.customer_name}</div>
                            {appointment.notes && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">{appointment.notes}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-900">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {appointment.phone}
                          </div>
                          {appointment.email && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Mail className="w-4 h-4 mr-2 text-gray-400" />
                              {appointment.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.date}</div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(appointment.status)}
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {appointment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                disabled={processingIds.has(appointment.id)}
                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                title="Onayla"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                disabled={processingIds.has(appointment.id)}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                title="İptal Et"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {appointment.status === 'confirmed' && (
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                              disabled={processingIds.has(appointment.id)}
                              className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                              title="Tamamla"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setShowEditModal(true)
                            }}
                            className="text-gray-600 hover:text-gray-900"
                            title="Düzenle"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteAppointment(appointment.id)}
                            disabled={processingIds.has(appointment.id)}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Randevu bulunamadı</h3>
            <p className="text-gray-500">Arama kriterlerinize uygun randevu bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  )
}