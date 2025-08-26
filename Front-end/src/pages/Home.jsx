import React from 'react'
import Header from '../components/Header' 
import Footer from '../components/Footer'
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
      
      
    </div>
  )
}

export default Home
