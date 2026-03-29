import React, { Suspense, lazy } from 'react'
import Header from '../components/Header'

const BusinessInfoSection = lazy(() => import('../components/BusinessInfoSection '))
const Recommended = lazy(() => import('../components/Recommended'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh] py-20">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#CC5833] border-t-transparent"></div>
  </div>
)

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F2F0E9] text-[#1A1A1A] transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <BusinessInfoSection />
          <Recommended />
        </Suspense>
      </main>
    </div>
  )
}

export default Home