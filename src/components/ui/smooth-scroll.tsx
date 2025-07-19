import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    // Enhanced smooth scrolling with easing
    const smoothScrollTo = (target: number, duration: number = 1000) => {
      const start = window.pageYOffset
      const distance = target - start
      let startTime: number | null = null

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutCubic(progress)
        
        window.scrollTo(0, start + distance * ease)
        
        if (progress < 1) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }

    // Override default scroll behavior for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement
      const href = target.getAttribute('href')
      
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80
          smoothScrollTo(targetPosition, 1200)
        }
      }
    }

    // Add smooth scroll to all anchor links
    document.addEventListener('click', handleAnchorClick)

    // Enhanced wheel scrolling
    let isScrolling = false
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return
      
      // Only apply smooth scrolling for large scroll movements
      if (Math.abs(e.deltaY) > 50) {
        e.preventDefault()
        isScrolling = true
        
        const currentScroll = window.pageYOffset
        const targetScroll = currentScroll + (e.deltaY > 0 ? 300 : -300)
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const finalTarget = Math.max(0, Math.min(targetScroll, maxScroll))
        
        smoothScrollTo(finalTarget, 800)
        
        setTimeout(() => {
          isScrolling = false
        }, 800)
      }
    }

    // Add enhanced wheel scrolling (optional - can be disabled if too aggressive)
    // document.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      // document.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return null
}