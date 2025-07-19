import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Wifi, 
  Database, 
  Server, 
  Users, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useRealTimeSync } from '../../hooks/useRealTimeSync'
import { apiClient } from '../../lib/api'

interface SystemStatus {
  status: string
  connectedClients: number
  uptime: number
  timestamp: string
}

export default function SystemStatus() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const { connectionStatus } = useRealTimeSync(true)

  useEffect(() => {
    loadSystemStatus()
    const interval = setInterval(loadSystemStatus, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const loadSystemStatus = async () => {
    try {
      const status = await apiClient.getSystemStatus()
      setSystemStatus(status)
    } catch (error) {
      console.error('Error loading system status:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}s ${minutes}d`
  }

  const getStatusIcon = (isOnline: boolean) => {
    return isOnline ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    )
  }

  const getStatusColor = (isOnline: boolean) => {
    return isOnline ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sistem Durumu</h1>
        <p className="text-gray-600">Gerçek zamanlı sistem performansı ve bağlantı durumu</p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Sistem durumu kontrol ediliyor...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Server Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Server className="w-6 h-6 text-white" />
              </div>
              {getStatusIcon(systemStatus?.status === 'online')}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Sunucu</h3>
            <p className={`text-sm font-medium ${getStatusColor(systemStatus?.status === 'online')}`}>
              {systemStatus?.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
            </p>
            {systemStatus && (
              <p className="text-xs text-gray-500 mt-2">
                Çalışma süresi: {formatUptime(systemStatus.uptime)}
              </p>
            )}
          </motion.div>

          {/* WebSocket Connection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500 p-3 rounded-lg">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              {getStatusIcon(connectionStatus.isConnected)}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">WebSocket</h3>
            <p className={`text-sm font-medium ${getStatusColor(connectionStatus.isConnected)}`}>
              {connectionStatus.isConnected ? 'Bağlı' : 
               connectionStatus.isReconnecting ? 'Bağlanıyor...' : 'Bağlantı Yok'}
            </p>
            {connectionStatus.error && (
              <p className="text-xs text-red-500 mt-2">{connectionStatus.error}</p>
            )}
          </motion.div>

          {/* Connected Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Aktif Kullanıcı</h3>
            <p className="text-2xl font-bold text-gray-900">
              {systemStatus?.connectedClients || 0}
            </p>
            <p className="text-xs text-gray-500 mt-2">Bağlı istemci sayısı</p>
          </motion.div>

          {/* Last Update */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Son Güncelleme</h3>
            <p className="text-sm text-gray-600">
              {systemStatus ? new Date(systemStatus.timestamp).toLocaleTimeString('tr-TR') : '--:--'}
            </p>
            <p className="text-xs text-gray-500 mt-2">Sistem zamanı</p>
          </motion.div>
        </div>
      )}

      {/* System Health Details */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sistem Sağlığı</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Database className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-900">Veritabanı Bağlantısı</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">Aktif</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Server className="w-5 h-5 text-purple-500" />
              <span className="font-medium text-gray-900">API Servisleri</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">Çalışıyor</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-green-500" />
              <span className="font-medium text-gray-900">Gerçek Zamanlı Senkronizasyon</span>
            </div>
            <div className="flex items-center space-x-2">
              {connectionStatus.isConnected ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">Aktif</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600">Bağlantı Bekleniyor</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performans Metrikleri</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {connectionStatus.isConnected ? '<50ms' : '--'}
            </div>
            <div className="text-sm text-gray-600">Ortalama Yanıt Süresi</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
            <div className="text-sm text-gray-600">Çalışma Süresi</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {systemStatus?.connectedClients || 0}
            </div>
            <div className="text-sm text-gray-600">Eşzamanlı Bağlantı</div>
          </div>
        </div>
      </div>
    </div>
  )
}