import React, { Suspense, lazy } from 'react'
import Header from '../components/Header' 

// Lazy load non-critical components
const BusinessInfoSection = lazy(() => import('../components/BusinessInfoSection '))
const Recommended = lazy(() => import('../components/Recommended'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header/>  
      <main > 
        <Suspense fallback={<LoadingFallback />}>
          <BusinessInfoSection/>
          <Recommended/>
        </Suspense>
      </main>
      
      
    </div>
  )
}

export default Home
