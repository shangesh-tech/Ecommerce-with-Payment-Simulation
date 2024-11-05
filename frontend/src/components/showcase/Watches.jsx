import React from 'react'
import wat1 from '../../assets/showcase/watches/boAt Cosmos Pro 4.webp'
import wat2 from '../../assets/showcase/watches/boAt TRebel Blaze 1.webp'
import wat3 from '../../assets/showcase/watches/boAt Wave Style Call 2.webp'
import wat4 from '../../assets/showcase/watches/boAt Wave Prime 47 3.webp'
import wat5 from '../../assets/showcase/watches/boAt Storm Call 3.webp'
import wat6 from '../../assets/showcase/watches/boAt Storm RTL 3.webp'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { searchProducts } from "../../app/slices/productSlice";


const Watches= () => {
  const dispatch = useDispatch();
  const navigator = useNavigate()
  return (
    <section className='mt-5'>
        <div className='flex items-center justify-between mx-10 cursor-pointer'>
            <h2 className='font-mono text-xl'>Watches at best <span className='text-red-600 font-semibold'>Prices</span> Under ₹10K</h2>
            <a className='text-blue-600' onClick={()=>{
               dispatch(searchProducts("Watches"));
               navigator("/result/Watches")
            }}>See More...</a>
        </div>
        <div className=' md:flex justify-center items-center px-20 py-3 cursor-pointer gap-3 space-y-4'>
            <img  src={wat1} className='md:w-2/12 border border-slate-700 rounded-md'/>
            <img  src={wat2} className='md:w-2/12 border border-slate-700 rounded-md'/>
            <img  src={wat3} className='md:w-2/12 border border-slate-700 rounded-md '/>
            <img  src={wat4} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md p-3'/>
            <img  src={wat5} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md'/>
            <img  src={wat6} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md '/>
        </div>
    </section>
  )
}

export default Watches