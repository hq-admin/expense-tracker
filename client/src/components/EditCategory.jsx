import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../config'

const EditCategory = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const navigate = useNavigate()
    const [data, setData] = useState({})
    console.log(id)

    const handleAdd = (e) => {
        e.preventDefault()
        try {
            const res = axiosInstance.put(`/categories/${id}`,
            {
                cat: data.cat,
                type: data.type
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

    useEffect(()=> {
        const getCategoryData = async() => {
            try {
                const res = await axiosInstance.get(`/categories/${id}`)
                setData(res.data)
                console.log(res.data)
                
            } catch(err) {
                console.log(err)
            }
            
        }
        getCategoryData()
    },[])

  return (
    <div className='mx-16 my-0 flex flex-col justify-center items-center'>
    <p>Edit Category</p>
    <div>
        <button className={data.type === "income" ? 'bg-green m-2 p-3 text-xl text-white':'bg-green m-2 p-2 text-l text-white'} onClick={()=>setData({...data, type: "income"})}>Income</button>
        <button className={data.type === "expense" ? 'bg-green m-2 p-3 text-xl text-white':'bg-green m-2 p-2 text-l text-white'} onClick={()=>setData({...data, type: "expense"})}>Expense</button>
    </div>
    
    <label>Cat: <input value={data.cat} className='border border-black p-2 m-2' onChange={(e)=>setData({...data, cat: e.target.value})} placeholder='Add Category name'/> </label>
    <div>
            <button onClick={handleAdd} className='m-2 p-2 text-l text-white bg-green'>ADD</button>
            <button onClick={handleClose} className='m-2 p-2 text-l text-white bg-green'>CLOSE</button>

    </div>
  </div>
  )
}

export default EditCategory