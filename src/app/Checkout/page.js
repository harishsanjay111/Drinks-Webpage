 "use client"
import React, { useEffect, useState } from 'react'
import AddressInput from '../Components/Layout/AddressInput'
import { useProfile } from '../Components/UseProfile'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const Checkout = () => {
  const [Address,SetAddress] = useState({})
  const {data:profileData} = useProfile();
  console.log("profile data :" ,profileData);
  const TotalMrp = useSelector(state => state.cart.totalMrp)
  const Itemdata = useSelector(state => state.cart.itemdata);
  


useEffect (() => {
if(profileData?.City) { 
  const {phone,streetAddress,City,Country,Postalcode} = profileData;
  const AddressFromProfile = {
    phone,  
    streetAddress,
    City,
    Country,
    Postalcode,
  }
  SetAddress(AddressFromProfile);
}
},[profileData]);

async function   proceedToCheckout (ev) {
  ev.preventDefault();
  const promise = new Promise((resolve,reject) => {
     fetch('/api/checkout', {
      method : 'POST',
      headers: {'Content-Type': 'application/json'},
       body : JSON.stringify({
        Address,
        cartproducts:Itemdata, 
        TotalMrp
       }), 
    }).then(async (response) => { 
      if(response.ok) {
        resolve();
        window.location = await response.json();
      } else {
        reject ();
      }  
    });
  });
  
 await toast.promise(promise, {
  loading : 'Preparing Your Order...',
  success : 'Redirecting to the payment...',
  error : 'Something Went Wrong, Please Try Again Later..'
 })
}


  function HandleAddressChange (propName,value) {
SetAddress(prevAddress => ({...prevAddress, [propName]:value}));
  } 
  
  return (
    <div>
      <div className='text-center py-[5rem]'>Checkout</div>
        <div className='bg-gray-100 p-4 rounded-lg'>

<div>
<form onSubmit={proceedToCheckout}>
<AddressInput AddressProps={Address}
setAddressProps={HandleAddressChange}
/>
<button className='button'>
Pay ₹{TotalMrp}
</button>
</form>
</div>
        </div>

    </div>
  )
}

export default Checkout
