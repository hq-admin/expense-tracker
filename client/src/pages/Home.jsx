import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TransactionsSummary from '../components/TransactionsSummary'

const Home = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gray'>
        <Navbar/>
        <TransactionsSummary/>
    </div>
  )
}

export default Home