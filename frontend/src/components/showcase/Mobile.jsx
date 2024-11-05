import React from 'react'
import mob1 from '../../assets/showcase/mobile/SAMSUNG Galaxy A23 (Peach, 128 GB) (8 GB RAM) 2.webp'
import mob2 from '../../assets/showcase/mobile/SAMSUNG Galaxy M53 5G (Mystique Green, 128 GB) (8 GB RAM) 2.webp'
import mob3 from '../../assets/showcase/mobile/realme GT Neo 3 (Asphalt Black, 128 GB) (8 GB RAM) 1.webp'
import mob4 from '../../assets/showcase/mobile/realme C30 (Bamboo Green, 32 GB) (2 GB RAM) 1.webp'
import mob5 from '../../assets/showcase/mobile/realme 9 Pro 5G (Midnight Black, 128 GB) (6 GB RAM) 1.webp'
import mob6 from '../../assets/showcase/mobile/realme 9 5G (Stargaze White, 128 GB) (6 GB RAM) 1.webp'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { searchProducts } from "../../app/slices/productSlice";


const Mobile= () => {
  const dispatch = useDispatch();
  const navigator = useNavigate()
  return (
    <section className='mt-5'>
        <div className='flex items-center justify-between mx-10 cursor-pointer'>
            <h2 className='font-mono text-xl'>Mobile at best <span className='text-red-600 font-semibold'>Prices</span> Under ₹20K</h2>
            <a className='text-blue-600' onClick={()=>{
               dispatch(searchProducts("Mobile"));
               navigator("/result/Mobile")
            }}>See More...</a>
        </div>
        <div className=' md:flex justify-center items-center px-20 py-1 cursor-pointer gap-3 space-y-4'>
            <img  src={mob1} className='md:w-2/12 border border-slate-700 rounded-md p-2'/>
            <img  src={mob2} className='md:w-2/12 border border-slate-700 rounded-md p-6'/>
            <img  src={mob3} className='md:w-2/12 border border-slate-700 rounded-md p-3'/>
            <img  src={mob4} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md p-3'/>
            <img  src={mob5} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md p-6'/>
            <img  src={mob6} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md p-6'/>
        </div>
    </section>
  )
}

export default Mobile