import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const CategoriesSummary = () => {

    const [cat, setCat] = useState([])

    useEffect(()=> {
        const getCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/categories')
                setCat(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getCategories()
    },[])

  return (
    <div className='flex flex-col items-center m-4'>
        <p className='text-lg font-bold underline'>CATEGORIES</p>

        <div>
            <p className='text-lg font-bold underline'>All Expense Categories</p>
                {cat && cat.map((e)=> (
                    <div>
                        {e.type === "expense" && 
                            <ul className='flex items-center w-full bg-white m-2'>
                                <li className='text-lg basis-3/6 px-2'>{e.cat}</li>
                                <p className='text-sm basis-1/6 px-2'>{e.type}</p>
                                <Link className='basis-1/6' to={`/`}><EditIcon className='m-1 sm:m-2'/></Link>
                                <button className='basis-1/6'><DeleteIcon className='m-1 sm:m-2 '/></button>
                                
                            </ul>
                        }
                        
                    </div>

                ))}
        </div>

        <div>
            <p className='text-lg font-bold underline'>All Income Categories</p>
                {cat && cat.map((e)=> (
                    <div>
                        {e.type === "income" && 
                            <ul className='flex items-center w-full bg-white m-2'>
                                <li className='text-lg basis-3/6 px-2'>{e.cat}</li>
                                <p className='text-sm basis-1/6 px-2'>{e.type}</p>
                                <Link className='basis-1/6' to={`/`}><EditIcon className='m-1 sm:m-2'/></Link>
                                <button className='basis-1/6'><DeleteIcon className='m-1 sm:m-2 '/></button>
                                
                            </ul>
                        }
                        
                    </div>

                ))}
        </div>
        
    </div>
  )
}

export default CategoriesSummary