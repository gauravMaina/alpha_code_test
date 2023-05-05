import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

function MainLayout(props) {
  const navigate = useNavigate()
  useEffect(()=>{
  const token =localStorage.getItem('token')
    if(!token) {
      navigate('/login')
    }
  },[])
  return (
    <>  
    <Header/>
    
    <Footer/>
    </>
  )
}

export default MainLayout
