'use client'

import React from 'react'
import { useState,useEffect } from 'react';
import Image from 'next/image';
import EditableImage from './EditableImage';
import { useProfile } from '../UseProfile';
import AddressInput from '../../Components/Layout/AddressInput';
const UserForm = ({user,onSave}) => {

const [userName,setUserName] = useState('');
const [phone,setPhone] = useState('');
const [streetAddress,setstreetAddress] = useState('');
const [Postalcode,setPostalcode] = useState('');    
const [City,setCity] = useState('');
const [Country,setCountry] = useState('');
const [image,setImage] = useState('');
const [admin,setAdmin] = useState(false);
const  {data:loggedInUserData} = useProfile();

useEffect(() => {
    setUserName(user?.name || '');
    setPhone(user?.phone || '');
    setstreetAddress(user?.streetAddress || '');  
    setPostalcode(user?.Postalcode || '');
    setCity(user?.City || ''); 
    setCountry(user?.Country || '');
    setImage(user?.image || '');
    setAdmin(user?.admin || false);
}, [user]);

function HandleAddressChange (propName,value) {
    if(propName === 'phone') setPhone(value);
    if(propName === 'streetAddress') setstreetAddress(value);
    if(propName === 'Postalcode') setPostalcode(value);
    if(propName === 'City') setCity(value);
    if(propName === 'Country') setCountry(value);

}



return (
<div>
<div className='rounded-xl mt-[30px]'>
<div>
{!image && (
    <Image
    src='/profile-icon.png'
    width={100}
    height={100}
    alt="Picture of the author"
    className='mx-auto rounded-[10px]'
    />)}

    </div>
<div>

    <EditableImage link={image} setLink={setImage}/>  



    </div>

</div>


<form className='max-w-md mx-auto' onSubmit={ev => onSave(ev , {
    name:userName,phone,streetAddress,Postalcode,City,Country,image,admin
})}>
<div className=' gap-10 items-center pt-[1rem]'>

<div>
<div>
<label className='pl-[10px]'>First name</label>
<input className="block w-full  rounded-xl p-4 border border-gray-300 bg-gray-200" type='text' placeholder='First and last name' value={userName} onChange={(ev) => setUserName(ev.target.value)} />
</div>
<label  className='pl-[10px]'>Email</label>
<input className="block w-full  rounded-xl p-4 border border-gray-300 bg-gray-500" type='email' disabled={true} value={user?.email}/>

 <AddressInput AddressProps = {{phone,streetAddress,Postalcode,City,Country}
 } setAddressProps = {HandleAddressChange}/>
{loggedInUserData.admin && (
    <div>
   
    <label className = 'p-2 inline-flex items-center gap-2 mb-2'
    htmlFor='adminCb'
    >
    <input id='adminCb' type='checkbox' className='' value={'1'} checked={admin} onClick={ev => setAdmin(ev.target.checked)}/>
    <span>Admin</span>
    
    </label>
    </div>
)}


<button className='save-btn block w-full font-semibold border rounded-xl px-6 py-2' type='submit'>Save</button>
</div>
</div>

</form>
</div>
)
}

export default UserForm
