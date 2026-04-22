import React, { Suspense, lazy } from 'react'
import Header from '../components/Header'
import PageBackground from '../components/PageBackground'

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
      <PageBackground />

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