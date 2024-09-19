'use client'

import React from 'react'
import Right from '../../Components/Layout/right'
import "../../Header/Header.css";

const Hero = () => {
  return ( 
    <section className=' lg:grid grid-cols-2'>  
    <div className='py-12'>
    <h1 className='  text-5xl font-semibold pt-[5rem] text-[#471717] leading-relaxed'>Everything <br/> is Cool with <br/><span className='bevarages'>Bevarages...</span> </h1>
    <p className='my-4 pt-[2rem]  text-gray-500'>Make this Summer Cool and Fresh with Bewarages and Sodas...</p>
   
      <div className='flex gap-4 pt-[2rem]'>
      <button className='orderBtn text-white  item-center flex gap-2 px-8 py-2 rounded-full'>
      Order Now
      <Right />
      </button>
      <button className='learn-more flex gap-2 py-2 text-gray-800'>Learn more
      <Right />
      </button>

      </div>
  
   </div>
   
   <div className='relative main-img'>
   <img src={'./cocacola.AI.png'} layout={"fill"} objectFit={'3'} alt={'drinks'}></img>
   </div> 
   </section>
  )
}

export default Hero