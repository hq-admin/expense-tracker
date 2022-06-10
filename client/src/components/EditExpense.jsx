import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditExpense = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [value, setValue] = useState(new Date());
    const handleAdd = (e) => {
        e.preventDefault()
        try {
            const res = axios.put(`http://localhost:5000/api/expenses/${id}`,
            {
                title: data.title,
                amount: data.amount,
                cat: data.cat,
                date: data.date
            })
            console.log(res.data)
            
        } catch(err) {
            console.log(err)
        }
        navigate('/')
    }

    const handleClose = (e) => {
        e.preventDefault()
        navigate('/')
    }

    useEffect(()=> {
        const getExpenseData = async() => {
            try {
                const res = await axios.get(`http://localhost:5000/api/expenses?id=${id}`)
                setData(res.data)
                
            } catch(err) {
                console.log(err)
            }
            
        }
        getExpenseData()
    },[])
  return (
    <div className='mx-16 my-0 flex flex-col justify-center items-center'>
    <p>Edit Expense</p>
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
            renderInput={(props) => <TextField {...props} />}
            label="Date"
            value={data.date}
            onChange={(newValue) => {
            setData({...data, date: newValue._d});
            }}
        />
    </LocalizationProvider>
    <label>Amount: $<input value={data.amount} onChange={(e)=>setData({...data, amount:e.target.value})} placeholder='Amount' className='border border-black p-2 m-2'/></label>
    <div>
        <label>Category: </label>
        <select value={data.cat} onChange={(e)=>setData({...data, cat:e.target.value})}>
                <option value="" disabled hidden>Choose here</option>
                <option value={'Eating out'}>Eating out</option>
                <option value={'Clothes'}>Clothes</option>
                <option value={'Entertainment'}>Entertainment</option>
                <option value={'Fuel'}>Fuel</option>
                <option value={'General'}>General</option>
                <option value={'Gifts'}>Gifts</option>
        </select>
    </div>
    <label>Notes: <input value={data.title} className='border border-black p-2 m-2' onChange={(e)=>setData({...data, title: e.target.value})} placeholder='Add Notes'/> </label>
    <div>
            <button onClick={handleAdd} className='m-2 p-2 text-l bg-blue'>ADD</button>
            <button onClick={handleClose} className='m-2 p-2 text-l bg-blue'>CLOSE</button>

    </div>
  </div>
  )
}

export default EditExpense