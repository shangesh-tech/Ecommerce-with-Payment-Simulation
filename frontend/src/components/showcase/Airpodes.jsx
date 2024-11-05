import React from 'react'
import { searchProducts } from "../../app/slices/productSlice";
import air1 from '../../assets/showcase/airpodes/boAt Airdopes 115 1.webp'
import air2 from '../../assets/showcase/airpodes/boAt TRebel Airdopes 431 1.webp'
import air3 from '../../assets/showcase/airpodes/boAt TRebel Airdopes 181 1.webp'
import air4 from '../../assets/showcase/airpodes/boAt Immortal 121 1.webp'
import air5 from '../../assets/showcase/airpodes/boAt Airdopes 701 ANC 1.webp'
import air6 from '../../assets/showcase/airpodes/boAt Airdopes 501 ANC 1.webp'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
const Airpodes = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate()
  return (
    <section >
        <div className='flex items-center justify-between mx-10 cursor-pointer'>
            <h2 className='font-mono text-xl'>Airpodes at best <span className='text-red-600 font-semibold'>Prices</span> Under ₹3999</h2>
            <a className='text-blue-600' onClick={()=>{
               dispatch(searchProducts("Airpodes"));
               navigator("/result/Airpodes")
            }}>See More...</a>
        </div>
        <div className=' md:flex justify-center items-center px-20 py-4 cursor-pointer gap-3 space-y-4'>
            <img  src={air1} className='md:w-2/12 border border-slate-700 rounded-md'/>
            <img  src={air2} className='md:w-2/12 border border-slate-700 rounded-md'/>
            <img  src={air3} className='md:w-2/12 border border-slate-700 rounded-md'/>
            <img  src={air4} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md'/>
            <img  src={air5} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md'/>
            <img  src={air6} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md p-3'/>
        </div>
    </section>
  )
}

export default Airpodes