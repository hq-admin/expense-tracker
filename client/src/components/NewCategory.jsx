import React, { useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config';


const NewCategory = () => {
    const navigate = useNavigate()
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('type');
    const [cat, setCat] = useState("")
    const [type, setType] = useState(name)


    const handleAdd = (e) => {
        e.preventDefault()

        try {
            const res = axiosInstance.post('/categories',
            {
                cat,
                type
            })
            console.log(res.data)
            
        } catch(err) {
            console.log(err)
        }
        navigate('/categories')
    }

    const handleClose = (e) => {
        e.preventDefault()
        navigate('/categories')
    }


  return (
    <div className='mx-16 my-0 flex flex-col justify-center items-center'>
        <p>Add New Category</p>
        <div>
            <button className={type === "income" ? 'm-2 p-3 text-xl text-white bg-green drop-shadow-2xl':'m-2 p-2 text-l text-white bg-green'} onClick={()=>setType("income")}>Income</button>
            <button className={type === "expense" ? 'm-2 p-3 text-xl text-white bg-green drop-shadow-2xl':'m-2 p-2 text-l text-white bg-green'} onClick={()=>setType("expense")}>Expense</button>
        </div>
        
        <label>Category: <input className='border border-black p-2 m-2' onChange={(e)=>setCat(e.target.value)} placeholder='Add a new Category'/> </label>
        <div>
                <button onClick={handleAdd} className='m-2 p-2 text-l text-white bg-green'>ADD</button>
                <button onClick={handleClose} className='m-2 p-2 text-l text-white bg-green'>CLOSE</button>

        </div>
      </div>
  )
}

export default NewCategory