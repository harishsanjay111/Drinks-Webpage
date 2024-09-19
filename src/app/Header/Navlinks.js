import React from 'react'
import Link from 'next/link'
const Navlinks = () => {
  return (
    <div>
    <nav className="flex  gap-10  items-center text-gray-500">
    
    <Link href={''}>Home</Link> 
    <Link href={''}>Menu</Link>
    <Link href={''}>About</Link>          
    <Link href={''}>Contact</Link>
   
    </nav>
    </div>
  )
}

export default Navlinks