'use client'
import Trash from "../icons/Trash/Trash";
import Plus from "../icons/Plus/Plus";
import React, { useState } from 'react'
import Chevrondown from '../../Components/icons/Chevrondown/Chevrondown'
import Chevronup from '../../Components/icons/Chevronup/Chevronup'
const MenuItemPriceProps = ({name,addLabel,Props,addProps}) => {
const [IsOpen,setIsOpen] = useState(false)
    function addSize() {
     addProps(oldSizes => {
      return [...oldSizes,{Name : '', price : '0'}];
     })
    }
    function editSize (ev,index,prop){
        const newValue = ev.target.value;
        
        addProps(prevSizes  => {
          const newSizes = [...prevSizes];
          newSizes[index][prop] = newValue;
          console.log(newSizes);
          return newSizes;
        })
        
        }
        
        function removeSize (indexToRemove) {
          addProps(prev => prev.filter((v,index) => index !== indexToRemove));
        }
  return (
    <div>
    <div className="bg-gray-200 p-2 rounded-md mb-2">
  <label>{name}</label>
  <div className="bg-gray-200 p-2 rounded-md mb-2">
  <button className=" inline-flex justify-center p-1 border-0" type="button" onClick={() => setIsOpen(prev => !prev)}>
  {
    IsOpen && (

        <Chevronup className = 'w-5'/>

    )
    


}
{
   !IsOpen && (

        <Chevrondown  className = 'w-5'/>

    )
    


}
 
  </button>
  <span>{name}</span>
  <span>({Props?.length})</span>
  
  </div>
  <div className={IsOpen ? 'block' : "hidden"}>
  {Props?.length > 0 && Props.map((size,index) => (
    <div key={index} className="flex items-end gap-2"> 
    <div >
    <label className="text-gray-400">Size name</label>
    <input type="text" placeholder="Size name" value={size.Name} className="border rounded-xl mb-2 p-2" onChange={ev => editSize(ev,index, 'Name')} />
    </div>
    <div>
    <label className="text-gray-400">Extra price</label>
    <input type="text" placeholder="Extra price" value={size.price} className="border max-w-lg rounded-xl mb-2 p-2" onChange={ev => editSize(ev,index, 'price')  } />
    </div>
    <div className="mb-2">
    <button type="button" onClick={() => removeSize(index) } className="bg-white btn"> <Trash /> </button>
    </div>
    </div>
    
  ))}
  
  </div>
  <button className="bg-white btn" type="button" onClick={addSize}> <Plus className="size-5 mt-[2px]"/>{addLabel}</button>
  </div>
    
  </div>
)
}

export default MenuItemPriceProps 