import React from 'react';
import { motion } from 'framer-motion';
import AdminPanel from './components/admin/admin-panel';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Hero from './components/sections/hero';
import About from './components/sections/about';
import Services from './components/sections/services';
import Gallery from './components/sections/gallery';
import Appointment from './components/sections/appointment';
import ScrollProgress from './components/animations/scroll-progress';
import SmoothScroll from './components/ui/smooth-scroll';
import WhatsAppFloat from './components/ui/whatsapp-float';
import PageTransition from './components/animations/page-transition';

function App() {
  // Check if we're in admin mode (you can implement proper routing later)
  const isAdminMode = window.location.pathname.startsWith('/admin');

  if (isAdminMode) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Advanced UI Elements */}
      <ScrollProgress />
      <SmoothScroll />
      <WhatsAppFloat />
      
      <Navbar />
      <PageTransition>
        <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Appointment />
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}

export default App;
