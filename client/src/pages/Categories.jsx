import React from 'react'
import { Link } from 'react-router-dom'
import CategoriesSummary from '../components/CategoriesSummary'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className='h-screen flex flex-col items-center bg-gray'>
        <Navbar/>
        <CategoriesSummary/>
    </div>
  )
}

export default Home