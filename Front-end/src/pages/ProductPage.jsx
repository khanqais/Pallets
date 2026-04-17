import React, { Suspense, lazy } from 'react'
import Header from '../components/Header'

// Lazy load the heavy component
const ProductCategories = lazy(() => import('../components/ProductCategories '))

const LoadingFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center py-20">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#CC5833] border-t-transparent"></div>
  </div>
)

const ProductPage = () => {
  return (
    <div className="relative min-h-screen bg-[#F2F0E9] text-[#1A1A1A] transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      {/* Global Background Image Overlay for Product Page */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-100 dark:opacity-[0.60] pointer-events-none"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      {/* Global Gradient Overlay for depth and text readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-[#F2F0E9]/20 to-[#F2F0E9]/85 dark:via-gray-900/40 dark:to-gray-900/90 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Header />

        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <ProductCategories />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default ProductPage