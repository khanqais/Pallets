import React from 'react'
import Header from '../components/Header' 
import Footer from '../components/Footer'
import Product from '../components/Product'
import BusinessInfoSection from '../components/BusinessInfoSection '
import Recommended from '../components/Recommended'


const Home = () => {
  return (
    <div className="min-h-screen">
      <Header/>  
      <main > 
        <BusinessInfoSection/>
        <Recommended/>
      </main>
      
      <Footer/>
    </div>
  )
}

export default Home
