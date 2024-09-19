"use client"
import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useSession } from 'next-auth/react'
import UserTabs from "../Components/Layout/UserTabs/UserTabs"
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast';

import UserForm from '../Components/Layout/UserForm'
const ProfilePage = () => {
   const [user,setUser] = useState(null);
    const [isAdmin,setIsAdmin] = useState(false);
    const [profileFetched,setprofileFetched] = useState(false);
    
    const session = useSession();
    const {status} = session;
    
    
    useEffect(() =>{
        if(status === "authenticated") {
           
        fetch('/api/profile').then(response => {
            response.json().then(data => {  
              setUser(data);
                setIsAdmin(data.admin);
                setprofileFetched(true);
            });
        });
        }
    },[session, status]);
    async function handleProfileInfoUpdate  (ev,data)  {
        
        
        ev.preventDefault();
        
      
        
            const response = await fetch('/api/profile',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                    body : JSON.stringify(data),
        
        
                })
                console.log(data);
                if(response.ok) {
         
                    if (data.name.length >= 3) {
                        toast.dismiss();
                    toast.success("Profile Saved!");
                
                    } 
    
               }
               else{
                toast.dismiss();
                toast.error("Error");
               }
       
       
      
        
           
    }
  
   
    

    if (status === "loading" || !profileFetched ) {
        return "loading...";
        
    }
    if (status === "unauthenticated") {
        return redirect("/login");
        
    }
    
  return (
    <section className='mt-8'>
    <UserTabs isAdmin={isAdmin}/>
    
    <div className='rounded-xl mt-[30px]'>
    
    <UserForm user={user} onSave={handleProfileInfoUpdate}/>
    
    </div>
   
    </section>
  )
}

export default ProfilePage;