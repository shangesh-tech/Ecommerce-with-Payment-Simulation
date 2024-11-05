import React from 'react'
import cam1 from '../../assets/showcase/camera/Nikon D850 45.7MP Digital SLR Camera (Black) with AF-S Nikkor 24-120mm F-4G ED VR Lens and 64GB Memory Card 1.jpg'
import cam2 from '../../assets/showcase/camera/SJCAM SJ4000 WiFi 12MP Optical Full HD WiFi Sports Action Camera 170°Wide FOV 30M Waterproof DV Camcorder, Gold 2.jpg'
import cam3 from '../../assets/showcase/camera/Fujifilm Instax Mini 9 Instant Camera (Cobalt Blue) 1.jpg'
import cam4 from '../../assets/showcase/camera/CP PLUS 3MP Full HD Smart Wi-fi CCTV Home Security Camera 2.jpg'
import cam5 from '../../assets/showcase/camera/Canon EOS 5D Mark IV 30.4 MP Digital SLR Camera (Black) + EF 24-105mm is II USM Lens Kit 2.jpg'
import cam6 from '../../assets/showcase/camera/Sony Alpha ILCE-6400 24.2MP Mirrorless Digital SLR Camera Body (APS-C Sensor, Real-Time Eye Auto Focus, 4K Vlogging Camera, Tiltable LCD) - Black 1.jpg'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchProducts } from "../../app/slices/productSlice";



const Camera= () => {
  const dispatch = useDispatch();
  const navigator = useNavigate()
  return (
    <section className='mt-5'>
        <div className='flex items-center justify-between mx-10 cursor-pointer'>
            <h2 className='font-mono text-xl'>Camera at best <span className='text-red-600 font-semibold'>Prices</span> Under ₹6999</h2>
            <a className='text-blue-600' onClick={()=>{
               dispatch(searchProducts("Camera"));
               navigator("/result/Camera")
            }}>See More...</a>
        </div>
        <div className=' md:flex justify-center items-center px-20 py-3 cursor-pointer gap-3 space-y-4'>
            <img  src={cam1} className='md:w-2/12 border border-slate-700 rounded-md'/>
            <img  src={cam2} className='md:w-2/12 border border-slate-700 rounded-md'/>
            <img  src={cam3} className='md:w-2/12 border border-slate-700 rounded-md p-3'/>
            <img  src={cam4} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md p-3'/>
            <img  src={cam5} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md'/>
            <img  src={cam6} className='md:w-2/12 hidden md:block border border-slate-700 rounded-md '/>
        </div>
    </section>
  )
}

export default Camera