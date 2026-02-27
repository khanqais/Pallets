import React, { Suspense, lazy } from 'react'
import Header from '../components/Header'

// Lazy load contact form
const ContactPage = lazy(() => import('../components/ContactPage'))

const LoadingFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center py-20">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#CC5833] border-t-transparent"></div>
  </div>
)

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#F2F0E9] text-[#1A1A1A] transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <Header />

      <Suspense fallback={<LoadingFallback />}>
        <ContactPage />
      </Suspense>
    </div>
  )
}

export default Contact