import React, { Suspense, lazy } from 'react'
import Header from '../components/Header'

// Lazy load the heavy component
const ProductCategories = lazy(() => import('../components/ProductCategories '))

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20 min-h-[50vh]">
    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

const ProductPage = () => {
  return (
   <>
   <Header/>
   <main>
    <Suspense fallback={<LoadingFallback />}>
      <ProductCategories/>
    </Suspense>
   </main>
   

   </>
  )
}

export default ProductPage