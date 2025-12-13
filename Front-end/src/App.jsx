import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import ScrollToTop from './components/ScrollToTop'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Contact from './pages/Contact';

const App = () => {
  return (
    <>
      <ScrollToTop />
      
      <div className="App bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
