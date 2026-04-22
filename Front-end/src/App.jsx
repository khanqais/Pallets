import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'; 
import Footer from './components/Footer';
import Home from './pages/Home';

const ProductPage = lazy(() => import('./pages/ProductPage'));
const Contact = lazy(() => import('./pages/Contact'));


const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <>
      <ScrollToTop />
      
      <div className="App bg-white dark:bg-gray-900 transition-colors duration-300">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </>
  );
}

export default App;
