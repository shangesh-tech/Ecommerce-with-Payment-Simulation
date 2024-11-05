import React from 'react'
import Tv1 from '../../assets/showcase/TV/acer I Series 127 cm (50 inch) Ultra HD (4K) LED Smart Android TV with Android 11, 30W Dolby Audio, MEMC (2022 Model) (AR50AR2851UDFL) 1.webp'
import Tv2 from '../../assets/showcase/TV/LG 123 cm (49 inch) Ultra HD (4K) LED Smart WebOS TV (49UK7500PTA) 1.webp'
import Tv3 from '../../assets/showcase/TV/LG 164 cm (65 inch) OLED Ultra HD (4K) Smart TV 1.webp'
import Tv4 from '../../assets/showcase/TV/Mi 5A 100 cm (40 inch) Full HD LED Smart Android TV with Dolby Audio (2022 Model) 1.webp'
import Tv5 from '../../assets/showcase/TV/SAMSUNG Q Series 163 cm (65 inch) QLED Ultra HD (4K) Smart Tizen TV (65Q7FN) 3.webp'
import Tv6 from '../../assets/showcase/TV/MOTOROLA ZX2 100 cm (40 inch) Full HD LED Smart Android TV with Dolby Atmos and Dolby Vision (40SAFHDME) 3.webp'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchProducts } from "../../app/slices/productSlice";



const Tv= () => {
  const dispatch = useDispatch();
  const navigator = useNavigate()
  return (
    
    <section className='mt-5'>
        <div className='flex items-center justify-between mx-10 cursor-pointer'>
            <h2 className='font-mono text-xl'>Smart Television at best <span className='text-red-600 font-semibold'>Prices</span> Under ₹30K</h2>
            <a className='text-blue-600' onClick={()=>{
               dispatch(searchProducts("Tv"));
               navigator("/result/TV")
            }}>See More...</a>
        </div>
        <div className=' md:flex justify-center items-center px-20 py-3 cursor-pointer gap-3 space-y-4'>
            <img  src={Tv1} className='md:w-2/12 border border-slate-700 rounded-md p-2'/>
            <img  src={Tv2} className='md:w-2/12 border border-slate-700 rounded-md p-2'/>
            <img  src={Tv3} className='md:w-2/12 border border-slate-700 rounded-md p-1'/>
            <img  src={Tv4} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md p-3'/>
            <img  src={Tv5} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md p-1'/>
            <img  src={Tv6} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md '/>
        </div>
    </section>
  )
}

export default Tv