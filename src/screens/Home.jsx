import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Caraousal from '../components/Caraousal'

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div><Navbar /></div>
      <div><Caraousal/></div>
      <div className="flex-grow-1 d-flex flex-wrap justify-content-center align-items-start mt-4 mb-5 gap-4">
        <Card/>
        <Card/>
        <Card/>
      </div>
      <div><Footer /></div>
    </div>
  )
}
