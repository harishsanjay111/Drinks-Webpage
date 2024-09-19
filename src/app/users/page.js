'use client'

import React, { useEffect, useState } from 'react'
import UserTabs from '../Components/Layout/UserTabs/UserTabs'
import { useProfile } from '../Components/UseProfile'
import Link from 'next/link'
const Users = () => {
    const {loading,data} = useProfile();
    const [users,setUsers] = useState([]);
    
    
    useEffect(()=> {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            })
        })
    },[])
if(loading) {
    return 'loading user info...'
}
    if(!data.admin){
        return 'Not an Admin..'
    }



  return (
    <div className='max-w-2xl mx-auto mt-8' >
<UserTabs isAdmin={true}/>
    <div>
    {users?.length > 0 && users.map(user =>(
        <div key={user._id} className="bg-gray-100 rounded-lg mb-2 items-center flex justify-between px-4 p-1">
  <div className="gap-4 grid grid-cols-2 max-[768px]:grid-cols-1 md:grid-cols-2">
    <div className="text-gray-700">
      {user.name ? (
        <span>{user.name}</span>
      ) : (
        <span className="italic">No Name</span>
      )}
    </div>
    <span className="text-gray-400">{user.email}</span>
  </div>
  <div className='max-w-md'>
  <Link href={'/users/'+user._id} className="btn px-4 py-2 ">Edit</Link>
  </div>
</div>
    ))}
    </div>
    
    </div>
  )
}

export default Users;