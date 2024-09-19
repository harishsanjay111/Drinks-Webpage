'use client';
// import MenuItemPriceProps from '../Layout/MenuItemPriceProps'
import { useState,useEffect } from "react";
import EditableImage from "../../Components/Layout/EditableImage";
import Link from "next/link";
export default function MenuItemForm ({onSubmit,menuItem}) {
    const [image,setImage] = useState();
    const [Name,setName] = useState();
    const [Baseprice,setBaseprice] = useState();
    const [DiscountPrice,setDiscountPrice] = useState();
    const [PercentageOFF,setPercentageOFF] = useState('');
    const [TotalQuantity,setTotalQuantity] = useState('');
// const [minDelivery,setminDelivery] = useState('');
// const [maxDelivery,setmaxDelivery] = useState('');
// const [DeliveryData,setDeliveryData] = useState('');
    useEffect(() => {
      setImage(menuItem?.image || '');
      setName(menuItem?.Name || '');
      setBaseprice(menuItem?.Baseprice || "0");
      setDiscountPrice(menuItem?.DiscountPrice|| "0");
      setPercentageOFF(menuItem?.PercentageOFF || '0%');
      setTotalQuantity(menuItem?.TotalQuantity || '0');
      // setminDelivery(menuItem?.minDelivery || '0');
  }, [menuItem]);

  const handleBasepriceChange = (ev) => {
    const Baseprice = parseFloat(ev.target.value);
    setBaseprice(Baseprice);
    calculatePercentageOFF(Baseprice, DiscountPrice);
  };

  const handleDiscountPriceChange = (ev) => {
    const discountPrice = parseFloat(ev.target.value);
    setDiscountPrice(discountPrice);
    calculatePercentageOFF(Baseprice, discountPrice,TotalQuantity);
  };

  const calculatePercentageOFF = (Baseprice, discountPrice,TotalQuantity) => {
    const basePriceNum = parseFloat(Baseprice) || 0;
    const discountPriceNum = parseFloat(discountPrice);
    if (isNaN(basePriceNum) || isNaN(discountPriceNum) || isNaN(TotalQuantity)) {
      
      setDiscountPrice('0');
      setPercentageOFF('0%');
      setTotalQuantity('0');
    } else if (basePriceNum > 0 && discountPrice > 0) {
      const percentageOff = Math.floor(((basePriceNum - discountPrice) / basePriceNum) * 100);
      setPercentageOFF(`${percentageOff}`);
    } else {
      setPercentageOFF('0%');
    }
  };
 

return(

<div>
    <div>
  <EditableImage  link={image} setLink={setImage} />
  </div>
  <div className="mt-8">
  <Link className="max-w-md mx-auto block border border-gray-300 rounded-lg p-2 text-center cursor-pointer mt-[3rem]" href={'/menu-items'}>Show all Menu item</Link>
  </div>
  <form className="mt-8"  onSubmit={ ev => onSubmit(ev, {image,Name,Baseprice,DiscountPrice,PercentageOFF,TotalQuantity})}>
  <div className="gap-2 items-end">
 
  <div className="grow">
  <label>Item Name</label>
  <input className="block w-full rounded-xl mb-2 p-2 border border-gray-300 bg-gray-200" value={Name} onChange={ev => setName(ev.target.value)} type="text" />

 
 
  <label>Base Price</label>
  <input className="block w-full rounded-xl mb-2 p-2 border border-gray-300 bg-gray-200" value={Baseprice} onChange={handleBasepriceChange} type="text" />
  <label>Discount Price</label>
  <input className="block w-full rounded-xl mb-2 p-2 border border-gray-300 bg-gray-200" value={DiscountPrice} onChange={handleDiscountPriceChange} type="text" />
  <label>%Percentage OFF</label>
  <input className="block w-full rounded-xl mb-2 p-2 border border-gray-300 bg-gray-400" disabled={true} value={PercentageOFF}  type="text" />
  <label>Set Quantity</label>
  <input className="block w-full rounded-xl mb-2 p-2 border border-gray-300 bg-gray-200" value={TotalQuantity} onChange={ev => setTotalQuantity(Math.max(0, parseInt(ev.target.value, 10)))} type="number" />

  
  <div className="pt-[0.8rem]">
  <button type="submit" className="btn create-btn rounded-xl">

 Save</button>
 
  </div> 
  
  </div>
  </div>
  
  </form>
  </div>
)
}