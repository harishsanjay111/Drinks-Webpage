'use client';
import './Cart.css';
import React, { useEffect, useState } from 'react';
import "../Components/Layout/Products/Product.css";
import Additems from '../Components/Layout/AddItems/Additems';
import Total from "../Components/Layout/Total/total";
import { useCart } from '../Components/UseCart';
import { useMenuitems } from '../Components/UseMenuitems';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import toast from 'react-hot-toast';

const Cartitem = () => {
  const { data } = useCart(); // Ensure this hook updates properly
  const { dataMenu } = useMenuitems();
  const [ShowTotal , setShowTotal] = useState(false)
const Itemdata = useSelector( state => state.cart.itemdata);
  // Derive ShowCart directly from the data length
  useEffect(() => {
    if (Itemdata.length > 0) {
      setShowTotal(true);
    } else {
      setShowTotal(false);
    }
  }, [data]);
  useEffect(() => {
    if( typeof window !== 'undefined'){
      if(window.location.href.includes('cancelled=1')){
        toast.dismiss();
        toast.error('Payment failed');
      } 
    }
  },[]);

 // Effectively monitors changes in data length

  // Early return if ShowCart is false
  

  // If ShowCart is true, render the cart items
  return (
    <div className='pt-[5rem] flex'>
      <ul>
        {Itemdata.map((item) => (
          <li key={item.id}>
            <div className='grid grid-cols-[40rem] max-[768px]:grid-cols-[13rem] pb-[1rem]'>
              <div className='bg-gray-200 hover:bg-white hover:shadow-hover-shadow-black/75 p-4 rounded-[5px] text-center transition-all grid max-[768px]:grid-cols-1 max-[768px]:w-[12rem]' >
                <img className=' max-[768px]:mx-[auto] max-[768px]:w-[8rem] w-[10rem]' src={item.image} alt={item.Name} />
                <h2 className='name2 text-[15px] max-[768px]:text-[15px] max-[768px]:mt-[2rem] max-[768px]: mt-[-7rem] mb-[1rem]'>{item.Name}</h2>
                <div>
                  <p className='text-gray-900 max-[768px]:text-[16px] text-[25px] price2 max-[768px]:mb-[1rem] mb-[4rem]'>
                    <span className='mainPrice2'>₹{item.Baseprice}</span> ₹{item.DiscountPrice}{' '}
                    <span className='offer2'>{item.PercentageOFF}% Off</span>
                  </p>
                </div>
                {dataMenu.filter((Menuitems) => Menuitems._id === item.id).map((Menuitems) => (
                    <div key={Menuitems._id}>
                      <Additems
                        Id={Menuitems._id}
                        Baseprice={Menuitems.Baseprice}
                        DiscountPrice={Menuitems.DiscountPrice}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {
        ShowTotal ? (
          <div className='mx-[auto]'>
            <Total />
          </div>
        ) : (
          <div className= 'mt-[10rem] mx-[auto]'>
          <Image
      src="/empty-cart.png"
      width={200}
      height={200}
      alt="Picture of the author"
    />
          </div>
        )
      }
      
    </div>
  );
};

export default Cartitem;
