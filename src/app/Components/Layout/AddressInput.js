import React from 'react'

const AddressInput = ({AddressProps,setAddressProps}) => {

    const {phone,streetAddress,Postalcode,Country,City} = AddressProps;
  return (
    <div>
    <label  className='pl-[10px]'>Phone</label>
    <input className="block w-full  rounded-xl p-4 border border-gray-300 bg-gray-200" type='tel' placeholder='phone number' value={phone}  onChange={ev => setAddressProps('phone',ev.target.value)} />
    <label  className='pl-[10px]'>Street</label>
    <input className="block w-full  rounded-xl p-4 border border-gray-300 bg-gray-200" type='text' placeholder='Street' value={streetAddress}  onChange={ev => setAddressProps('streetAddress',ev.target.value)} />
    <div className=' grid grid-cols-2 gap-2'>
    <div>
    <label  className='pl-[10px]'>Postal code</label>
    <input style={{"margin":'0'}} className=" block w-full  rounded-xl p-4 border border-gray-300 bg-gray-200" type='text' placeholder='Postal code' value={Postalcode}  onChange={ev => setAddressProps('Postalcode',ev.target.value)} />
    </div>
    <div>
    <label  className='pl-[10px]'>City</label>
    <input  style={{"margin":'0'}} className="block w-full  rounded-xl p-4 border border-gray-300 bg-gray-200" type='text' placeholder='City' value={City}  onChange={ev => setAddressProps('City',ev.target.value)} />
    </div>
    </div>
    <label className='pl-[10px]'>Country</label>
    <input className="block w-full rounded-xl mb-4 p-4 border border-gray-300 bg-gray-200" type='text' placeholder='Country'  value={Country} onChange={ev => setAddressProps('Country',ev.target.value)} />
    </div>
  )
}

export default AddressInput
