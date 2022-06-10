import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TransactionsSummary = () => {
  const d = new Date();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();

  const fullMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const [data, setData] = useState([])
  const [monthyear, setMonthYear] = useState({month, year})

  const handleDelete = (id) => {
    
    try {
      const res = axios.delete(`http://localhost:5000/api/transactions?id=${id}`)
      
      console.log(res.data)
    } catch(err) {
      console.log(err)
    }
  }



  useEffect(()=> {
    const getTransactions = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/transactions?month=${monthyear.month}&year=${monthyear.year}`)
        setData(res.data)
        console.log(res.data)
      } catch(err) {
        console.log(err)
      }
      
    }
    getTransactions()
  }, [monthyear])

  return (
    <div className='mx-16 w-11/12 sm:w-3/5 my-0 flex flex-col items-center bg-white '>
        
        <div>
          <label className='text-md font-bold'>Month: </label>
          <select value={monthyear.month} onChange={(e)=> setMonthYear({...monthyear, month: e.target.value})}>
            <option value='1'>Jan</option>
            <option value='2'>Feb</option>
            <option value='3'>Mar</option>
            <option value='4'>Apr</option>
            <option value='5'>May</option>
            <option value='6'>Jun</option>
            <option value='7'>Jul</option>
            <option value='8'>Aug</option>
            <option value='9'>Sep</option>
            <option value='10'>Oct</option>
            <option value='11'>Nov</option>
            <option value='12'>Dec</option>
          </select>
        </div>
        
        <div>
          <label className='text-md font-bold'>Year: </label>
          <select value={monthyear.year} onChange={(e)=> setMonthYear({...monthyear, year: e.target.value})}>
            <option value='2020'>2020</option>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
          </select>
        </div>
        
        {data.map((e)=> (
            <div key={e._id} className='flex justify-between w-full p-4 m-2'>
                <div className='bg-green text-white rounded-full p-2 text-center basis-1/5'>
                    <div>{new Date(e.date).getDate()} {fullMonths[new Date(e.date).getMonth()]}</div>
                    <div>{new Date(e.date).getFullYear()}</div>
                </div>
                <div className='basis-2/5 m-2'>
                    <p className='text-lg font-bold'>{e.cat}</p>
                    <p>{e.title}</p>
                </div>
                <div className='basis-1/5 self-center'>$ {e.amount}</div>
                <div className='basis-1/5 self-center'>
                  <Link to={`/editexpense/${e._id}`}><EditIcon className='m-1 sm:m-2'/></Link>
                  <button onClick={()=>handleDelete(e._id)}><DeleteIcon className='m-1 sm:m-2'/></button>
                </div>
                    
            </div>
            
        ))}
    </div>
    
  )
  
}

export default TransactionsSummary