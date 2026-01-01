import React, { Suspense, lazy } from 'react'
import Header from '../components/Header'

// Lazy load contact form
const ContactPage = lazy(() => import('../components/ContactPage'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20 min-h-[50vh]">
    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

const Contact = () => {
  return (
    <div>
      <Header/>
      <Suspense fallback={<LoadingFallback />}>
        <ContactPage/>
      </Suspense>
    </div>
  )
}

export default Contact