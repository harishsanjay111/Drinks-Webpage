'use client'

import UserForm from '@/app/Components/Layout/UserForm'
import React, { useEffect, useState } from 'react'
import { useProfile } from '../../Components/UseProfile'
import UserTabs from '../../Components/Layout/UserTabs/UserTabs'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'

const EditUserPage = () => {
  const [user,setUser] = useState(null)
  const {Loading:userLoading, data:userData} = useProfile();
const  {id} = useParams();



useEffect(() => {
fetch('/api/profile?_id='+id).then(res => {
res.json().then(user => {
setUser(user);
})
})
},[]);
async function handleSaveButtonClick (ev,data) {
ev.preventDefault();
const promise =  new Promise(async (resolve,reject) => {
  const res =  await fetch('/api/profile', {
    method : 'PUT',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify({...data,_id:id}), 
  });
  if (res.ok) 
    resolve();
  else 
  reject(); 
});
toast.dismiss();
  toast.promise(promise, {
    loading : 'Saving User..',
success : 'User saved',
error : 'An error occurred while saving',
  });


}

// if(userLoading) {
//     return "Loading user Info..."
// }
// if(!userData.admin) {
//     return "Not an admin."
// }

return ( 
<section className='mt-8 mx-auto max-w-2xl'>
<UserTabs isAdmin={true}/>    
<UserForm user={user} onSave={handleSaveButtonClick}/>
</section>
)
}

export default EditUserPage;
