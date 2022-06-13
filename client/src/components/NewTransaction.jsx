import React, { useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config';


const NewTransaction = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState(new Date());
    const [cat, setCat] = useState("")
    const [amount, setAmount] = useState()
    const [notes, setNotes] = useState("")
    const [type, setType] = useState("expense")
console.log({
    date: value,
    title: notes,
    amount,
    cat,
    type
})

    const handleAdd = (e) => {
        e.preventDefault()

        try {
            const res = axiosInstance.post('/transactions',
            {
                date: value,
                notes,
                amount,
                cat,
                type
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
        <p>Add New Transaction</p>
        <div>
            <button className='m-2 p-2 text-l text-white bg-blue' onClick={()=>changeType("income")}>Income</button>
            <button className='m-2 p-2 text-l text-white bg-blue' onClick={()=>changeType("expense")}>Expense</button>
        </div>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                renderInput={(props) => <TextField {...props} />}
                label="Date"
                value={value._d}
                onChange={(newValue) => {
                setValue(newValue._d);
                }}
            />
        </LocalizationProvider>
        <label>Amount: $<input onChange={(e)=>setAmount(type==="expense"?-e.target.value:e.target.value)} placeholder='Amount' className='border border-black p-2 m-2'/></label>
        <div>
            <label>Category: </label>
            <select value={cat} onChange={(e)=>setCat(e.target.value)}>
                    <option value="" disabled hidden>Choose here</option>
                    <option value={'Eating out'}>Eating out</option>
                    <option value={'Clothes'}>Clothes</option>
                    <option value={'Entertainment'}>Entertainment</option>
                    <option value={'Fuel'}>Fuel</option>
                    <option value={'General'}>General</option>
                    <option value={'Gifts'}>Gifts</option>
            </select>
        </div>
        <label>Notes: <input className='border border-black p-2 m-2' onChange={(e)=>setNotes(e.target.value)} placeholder='Add Notes'/> </label>
        <div>
                <button onClick={handleAdd} className='m-2 p-2 text-l text-white bg-blue'>ADD</button>
                <button onClick={handleClose} className='m-2 p-2 text-l text-white bg-blue'>CLOSE</button>

        </div>
      </div>
  )
}

export default NewTransaction