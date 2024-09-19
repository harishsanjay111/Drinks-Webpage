import React, { useState } from 'react'

const DeleteButton = ({label,onDelete}) => {
    
    const [showConfirm,setShowConfirm] = useState(false);

    if(showConfirm){
    return(
        <div className='fixed bg-black/80 inset-0 flex items-center h-full justify-center'>
        <div className='bg-white p-4 rounded-lg'>
        <div>Are you sure you want to delete?..</div>
        <div className='flex gap-4'>
        <button onClick={()=> setShowConfirm(false)} className='btn'>Cancel</button>
        <button className='text-white btn1 bg-[red]' onClick={onDelete}>Yes&nbsp;Delete!</button>
        </div>
        </div>
        </div>
    )
}
  return (

    
    <div>
    <button  onClick={() => setShowConfirm(true)} className='btn' type='button'>
    {label}
    </button>
    
    </div>
  )
}

export default DeleteButton