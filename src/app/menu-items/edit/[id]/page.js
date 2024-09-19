'use client'
import MenuItemForm from "../../../Components/Layout/MenuItemsForms"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import UserTabs from "@/app/Components/Layout/UserTabs/UserTabs";
import { redirect } from "next/navigation";
import DeleteButton from '../../../Components/DeleteButton'
import { useCart } from "../../../Components/UseCart";
export default function EditMenuItemPage() {

   const {refreshCart} = useCart();
    const [redirectToItems,setredirectToItems] = useState(false);
    const [menuItem,setMenuItem] = useState(null);
   console.log(menuItem);
const {id} = useParams();
    console.log({id});
useEffect(()=> {
  fetch('/api/menu-items').then(res => {
    res.json().then(items => {
const item = items.find(item => item._id === id);


setMenuItem(item);
    })
  })
},[])
    async function HandleFormSubmit(ev,data) {
        ev.preventDefault();
         data = {...data,_id:id}
        const savingPromise = new Promise(async (resolve,reject) => {
          const response = await fetch('/api/menu-items', {
            method : 'PUT',
             body : JSON.stringify(data), 
             headers: {'Content-Type': 'application/json'},
            
          })
         
        if(response.ok) 
          resolve()
        else 
        reject()
        
        
        });
         await toast.promise(savingPromise,{
            loading : 'Saving this drink',
            success : 'Saved',
            error : 'Error',
          })
        
        setredirectToItems(true);
        await refreshCart();
        }
        async function HandleDeleteClick () {
          const promise = new Promise(async(resolve,reject) => {
            const res = await fetch('/api/menu-items?_id='+id, {
              method : 'DELETE',
        
            });
            if(res.ok) 
            resolve();
          else 
          reject();
          });
      
          await toast.promise(promise , {
            loading : 'Deleting...', 
            success : 'Deleted',
            error : 'Error'
          });
          setredirectToItems(true);
         }
   if(redirectToItems){
    return redirect('/menu-items');
   }
   
    return(
<div>
<section className="mt-8 max-w-lg mx-auto">
  <UserTabs isAdmin={true}/>
  
  <div>
  <MenuItemForm menuItem={menuItem} onSubmit={HandleFormSubmit} />
  </div>
  <div className="mt-[10px]">
  <DeleteButton label={'Delete this menu Item'} onDelete={HandleDeleteClick}/>
  
  
  </div>
  </section>

</div>
         
    )
}