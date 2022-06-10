import React from 'react'
import { Link } from 'react-router-dom'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';

const Navbar = () => {
  return (
    <div>
        <nav className='flex container my-8 justify-center'>
            <Link to={'/'} className='px-4 mx-2 text-2xl text-green rounded-lg'><AccountBalanceWalletIcon/> Transactions</Link>
            <Link to={'/newexpense'} className='px-4 mx-2 text-l bg-green text-xl text-white rounded-lg'><AddIcon className='self-center'/> ADD NEW TRANSACTION</Link>
            <Link to={'/login'} className='px-4 mx-2 text-2xl text-green rounded-lg'><LoginIcon/> Login</Link>
        </nav>
    </div>
  )
}

export default Navbar