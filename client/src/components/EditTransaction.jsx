import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditTransaction = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [value, setValue] = useState(new Date());
    const [type, setType] = useState("expense")
    const [amount, setAmount] = useState()

    const handleAdd = (e) => {
        e.preventDefault()
        try {
            const res = axios.put(`http://localhost:5000/api/transactions/${id}`,
            {
                notes: data.notes,
                amount: data.amount,
                cat: data.cat,
                date: data.date,
                type: data.type
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
        const getTransactionData = async() => {
            try {
                const res = await axios.get(`http://localhost:5000/api/transactions?id=${id}`)
                setData(res.data)
                
            } catch(err) {
                console.log(err)
            }
            
        }
        getTransactionData()
    },[])

    const changeType = (type) => {
        if(type === "income") {
            setType("income")
            if(amount && amount<0) {
                setAmount(amount*-1)
            }
        } else {
            setType("expense")
            if(amount && amount > 0) {
                setAmount(amount*-1)
            }
        }
    }

  return (
    <div className='mx-16 my-0 flex flex-col justify-center items-center'>
    <p>Edit Transaction</p>
    <div>
        <button className={type === "income" ? 'bg-green m-2 p-3 text-xl text-white':'bg-green m-2 p-2 text-l text-white'} onClick={()=>changeType("income")}>Income</button>
        <button className={type === "expense" ? 'bg-green m-2 p-3 text-xl text-white':'bg-green m-2 p-2 text-l text-white'} onClick={()=>changeType("expense")}>Expense</button>
    </div>
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
    <label>Notes: <input value={data.notes} className='border border-black p-2 m-2' onChange={(e)=>setData({...data, notes: e.target.value})} placeholder='Add Notes'/> </label>
    <div>
            <button onClick={handleAdd} className='m-2 p-2 text-l text-white bg-green'>ADD</button>
            <button onClick={handleClose} className='m-2 p-2 text-l text-white bg-green'>CLOSE</button>

    </div>
  </div>
  )
}

export default EditTransaction