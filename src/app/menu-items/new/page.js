'use client'
import "./menu-items.css";
import { useState } from "react";
import toast from "react-hot-toast";
import MenuItemForm from '../../Components/Layout/MenuItemsForms'
import UserTabs from "@/app/Components/Layout/UserTabs/UserTabs";
import { redirect } from "next/navigation";
import {useCart} from "../../Components/UseCart"
export default function NewMenuItemPage () {
  
    const [redirectToItems,setredirectToItems] = useState(false);
const {refreshCart} = useCart();
     

    async function HandleFormSubmit(ev,data) {
        ev.preventDefault();
        data = data;
        const savingPromise = new Promise (async (resolve,reject) => {
        
          const response = await fetch('/api/menu-items', {
            method : 'POST',
             body : JSON.stringify(data), 
             headers: {'Content-Type': 'application/json'},
            
          })
         
        if(response.ok) {
          resolve()
          
        }
          
        else {
          reject()
        }
        
        
        
        });
         await toast.promise(savingPromise,{
            loading : 'Saving this drink',
            success : 'Saved',
            error : 'Error',
          })
        
        setredirectToItems(true);
        
        }
   if(redirectToItems){
    return redirect('/menu-items');
   }

 

    return(
<div>
<section className="mt-8 max-w-lg mx-auto">
  <UserTabs isAdmin={true}/>
  
  <div className="mt-8">
  </div>
  <div>
  <MenuItemForm  onSubmit={HandleFormSubmit}/>
  </div>
  </section>

</div>
         
    )
}