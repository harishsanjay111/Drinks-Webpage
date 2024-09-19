'use client'


import Link from "next/link"
import "./UserTabs.css"
import { usePathname } from "next/navigation"

// <Link className={path === '/orders' ?  'active' : ''} href={'/orders'}>Orders</Link>
// <Link className={path === '/categories' ?  'active' : ''} href={'/categories'}>Categories</Link>
export default function UserTabs({isAdmin}) {
    const path = usePathname();
    console.log(path);  
    return (
       <div className="mb-[3rem] flex mx-auto max-[768px]:gap-5 gap-2 tabs justify-center">
       <Link className={path === '/Profile' ?  'active' : ''} 
       href={'/Profile'}
       >Profile</Link>
       {isAdmin && (
        <>
        
        <Link className={path.includes('menu-items') ?  'active' : ''}  href={'/menu-items'}>Menu Items</Link>
        <Link className={path.includes('users') ?  'active' : ''} href={'/users'}>Users</Link>
       
        </>
       )}
       
       </div> 
    )
}
