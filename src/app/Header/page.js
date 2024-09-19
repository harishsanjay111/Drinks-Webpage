'use client';
import React from 'react'
import Link from "next/link";
import "./Header.css";
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import ShoppingCart from "../Components/Layout/ShoppingCart/ShoppingCart" 
const Header = () => {
  const session = useSession();
  console.log(session);
  const status = session?.status; 
  const userData = session.data?.user;
  let userName = userData?.name ||  userData?.email;
  if(userName && userName.includes(' ')) {
userName = userName.split(' ')[0];
  }
  return (
    <div className='header'>  
    <div >
    <header className="flex max-[768px]:gap-5 items-center justify-between"> 

    <Link href={'/'} className="heading font-semibold text-[30px]">Beverages</Link>
    <div className="flex  gap-10 max-[768px]:gap-1  items-center text-gray-500">  
    { status === "authenticated" &&(
      
      <div >
      <Link className='px-[20px] text-[16px] max-[768px]:text-[10px] whitespace-nowrap'  href={'/Profile'}>Hello    {userName}</Link>
      <Link onClick={()=> signOut()}  href={'register'} className="registerBtn text-white px-4 py-2 max-[768px]:text-[13px]">Logout</Link>
      </div>
    )}
  
      
    
    {status === "unauthenticated" && (
    <div className='flex gap-10 max-[768px]:gap-2'>
    <div className='pt-[5px]'>
    <Link className='LoginBtn flex max-[768px]:text-[15px] ' href={"/login"}>Login <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" max-[768px]:w-4 w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
</Link>
</div>
<Link  href={'register'} className="registerBtn text-white px-4 py-2 max-[768px]:px-2 max-[768px]:text-[10px]">Register</Link>
    
    </div>
  )
  }
       
      
    
  
    <ShoppingCart />
    </div> 
    </header>
    </div>
    </div>
  )
}

export default Header