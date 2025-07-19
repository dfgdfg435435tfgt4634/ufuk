import React, { useState } from 'react'
import AdminLayout from './admin-layout'
import Dashboard from './dashboard'
import RealTimeAppointments from './real-time-appointments'
import Customers from './customers'
import Services from './services'
import Gallery from './gallery'
import ContentEditor from './content-editor'
import Analytics from './analytics'
import Finance from './finance'
import Settings from './settings'
import SystemStatus from './system-status'

export default function AdminPanel() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'appointments':
        return <RealTimeAppointments />
      case 'customers':
        return <Customers />
      case 'services':
        return <Services />
      case 'gallery':
        return <Gallery />
      case 'content':
        return <ContentEditor />
      case 'analytics':
        return <Analytics />
      case 'finance':
        return <Finance />
      case 'settings':
        return <Settings />
      case 'system':
        return <SystemStatus />
      default:
        return <Dashboard />
    }
  }

  return (
    <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </AdminLayout>
  )
}