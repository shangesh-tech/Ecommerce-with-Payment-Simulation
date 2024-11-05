import React, { useState } from 'react'
import Carousel from '../components/Carousel'
import img7 from '../assets/7.jpg'
import img7m from '../assets/7m.jpg'
import Airpodes from '../components/showcase/Airpodes.jsx'
import Camera from '../components/showcase/Camera.jsx'
import Mobile from '../components/showcase/Mobile.jsx'
import Watches from '../components/showcase/Watches.jsx'
import Tv from '../components/showcase/Tv.jsx'
import Sponsor from '../components/sponsor/Sponsor.jsx'
import Contact_Me from '../components/Contact_Me.jsx'
import { auth } from '../firebase.js'
const Home = () => {
 
  
  return (
    <>
      <Carousel/>
      <img src={img7} className="hidden md:block w-full h-64 px-8 py-6 rounded-full" />
      <img src={img7m} className="block md:hidden w-full h-64 px-8 py-6 rounded-full" />
      <Airpodes/>
      <div className="divider divider-error mx-28 mb-10 rounded-full"></div>
      <Camera/>
      <div className="divider divider-error mx-28 mb-10 rounded-full"></div>
      <Mobile/>
      <div className="divider divider-error mx-28 mb-10 rounded-full"></div>
      <Watches/>
      <div className="divider divider-error mx-28 mb-10 rounded-full"></div>
      <Tv/>
      <div className="divider divider-error mx-28 mb-10 rounded-full"></div>
      <Sponsor/>
      <Contact_Me/>
    </>
  )
}

export default Home