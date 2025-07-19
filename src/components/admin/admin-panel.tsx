import React, { useState } from 'react'
import AdminLayout from './admin-layout'
import Dashboard from './dashboard'
import Appointments from './appointments'
import Customers from './customers'
import Services from './services'
import Gallery from './gallery'
import ContentManagement from './content-management'
import Analytics from './analytics'
import Finance from './finance'
import Settings from './settings'

export default function AdminPanel() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'appointments':
        return <Appointments />
      case 'customers':
        return <Customers />
      case 'services':
        return <Services />
      case 'gallery':
        return <Gallery />
      case 'content':
        return <ContentManagement />
      case 'analytics':
        return <Analytics />
      case 'finance':
        return <Finance />
      case 'settings':
        return <Settings />
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