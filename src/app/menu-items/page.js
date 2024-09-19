'use client';

import { useEffect, useState } from "react";
import UserTabs from  "../Components/Layout/UserTabs/UserTabs"
import {useProfile} from "../Components/UseProfile"
import Link from "next/link";
import Image from "next/image";
export default function  MenuItemspage() { 
    const [menuItems,setMenuItems] = useState([]);
    const {Loading,data} = useProfile(); 
   useEffect(()=> {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems);
      })
    })
   },[])
    
console.log(menuItems);



if(Loading) {
    return 'Loading user Info...';
}
if(!data.admin) {
    return 'Not an admin.';
}


return(
  <section className="mt-8 max-w-2xl mx-auto">
  <UserTabs isAdmin={true}/>
  <div className="mt-8">
  <Link className="block border border-gray-300 rounded-lg p-2  cursor-pointer mt-[3rem] text-center" href={'/menu-items/new'}>Create new Menu item</Link>
  </div>

  <div >
<h2 className="text-gray-500 mt-4">Edit Menu Items: </h2>
<div className="grid grid-cols-3 gap-4  ">
{menuItems?.length > 0 && menuItems.map(Items => (

  <div key={Items._id}>
  <Link href={'/menu-items/edit/'+Items._id}  className="mb-1 max-w-md  block border bg-gray-300 border-gray-300 rounded-lg p-2  cursor-pointer  text-center flex-col">
  <div className="relative">
  <Image
  src={Items.image}
  width={200}
  height={200}
  alt="Picture of the author"
  className='mx-auto rounded-[10px]'
/> 
  </div>
  {Items.Name}</Link>
 
  </div>


))}
</div>
  
</div>

  </section>

)
} 