'use client'
import React from 'react'
import Cartitem from "../../../Cart/page"
import { useCart } from '../../UseCart'
import { useMenuitems } from '../../UseMenuitems'

const Cartitems = () => {
    const {dataMenu} =  useMenuitems();
    const Itemdata = useSelector(state => state.cart.itemdata);
    
    return (
    <div>
    
{ dataMenu.map((item) => (
  <div key={item._id}>
  <Cartitem  {...item} 
  
  />
  </div>
))}
    

    </div>
  )
}

export default Cartitems