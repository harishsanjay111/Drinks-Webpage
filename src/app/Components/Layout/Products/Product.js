"use client"
import Additems from "../AddItems/Additems";
import "./Product.css";
import { useState,useEffect } from "react";
import {useSelector,useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { cartactions } from "@/app/store/cart-slice";
import { useCart } from "../../UseCart";
// import {RefreshCache} from "../../../refresh-cache"
// import {CheckIfPostChanged} from "../../CheckifPostChanged/page"
 
const Product =  ({_id,Name, image,DiscountPrice,quantity, Baseprice,PercentageOFF}) => {
  const [showQuantity, setShowQuantity] = useState(false);
  const [ShowAddBtn,setShowAddBtn] = useState(false);
  const [Quantity,setQuantity] = useState(1);
  const {refreshCart} = useCart();
  const Itemdata = useSelector(state => state.cart.itemdata);
  
  
  console.log( "ItemIds:",_id);
  console.log("Itemdata:", Itemdata);


useEffect(() => {
  const itemExists = Itemdata.some(item => item.id === _id);
  console.log("itemexists:" , itemExists);
  
  if (itemExists) {
    setShowQuantity(true);
  }
  else {
    setShowQuantity(false)
  }
}, [Itemdata, _id]);



const dispatch = useDispatch();

  const CartData = {
    _id:_id,
    Name,
    image,
    DiscountPrice,
    Baseprice,
    PercentageOFF,
    quantity : Quantity,
    
  }


 async function HandleCartSubmit (ev) {
ev.preventDefault();

const savingPromise = new Promise (async (resolve,reject) => {
        
  const response = await fetch('/api/cart-items', {
    method : 'POST',
     body : JSON.stringify(CartData), 
     headers: {'Content-Type': 'application/json'},
    
  })
 
if(response.ok) {
  resolve()
  dispatch(
    cartactions.addTocart({
      id:_id,
      Name,
      image,
      DiscountPrice,
       Baseprice,
       PercentageOFF,
       quantity : Quantity,
       
    }))
}
  
else {
  reject()
}
});
 await toast.promise(savingPromise,{
    loading : 'Saving this drink',
    success : 'Saved',
    error : 'Error',
  })
  refreshCart();
    
}




// async function handleCartquantity (ev) {
//   ev.preventDefault();
//   data ={_id, quantity:quantitydata}
//   const promise = new Promise (async(resolve,reject) => {
//     const response = await fetch(`/api/cart-items`, {
//       method : 'PUT',
//       body : JSON.stringify(data),
//       headers :  {'Content-Type': 'application/json'},

//     })
//     if (response.ok) 
//     resolve();
//   else 
//   reject();
//   });
//   toast.dismiss();
//  await toast.promise(promise, {
// success : 'Added',
// error : "Error",
//  })
  
// }


//  async function CheckIfPostChanged ()  {

//   // ev.preventDefault();
  
//       const checkPostLastUpdated = data.map(item => new Date(item.updatedAt).getTime());
//       const didChange = timestamps !== checkPostLastUpdated
//        if(didChange) {
//           revalidatePath("/")
//        }
// console.log("did change? ",didChange);
//   }
// const timestamps = data.map(item => new Date(item.updatedAt).getTime());
//    console.log(timestamps);


  return (
    <div className='grid grid-cols-[20rem] pb-[2rem]'>
   
  
   
     
    <form onSubmit={HandleCartSubmit}>
<div  className='bg-gray-200 hover:bg-white hover:shadow-hover-shadow-black/75 p-4 rounded-[5px] text-center transition-all'>
<img className='image' src={image} alt={Name} />
<h2 className ='name text-[15px] mt-[2rem] mb-[1rem]'>{Name}</h2>
<div>

<p className='text-gray-900 text-[25px] price'><span className='mainPrice'>₹{Baseprice}</span> ₹{DiscountPrice} <span className='offer'> {PercentageOFF}%Off</span> </p>
</div>


      
{ !showQuantity &&
  <button  type='submit'  className='add mt-4 text-[15px] tracking-[1px] rounded-[7px] px-4 py-1' >
    Add
  </button>
}
  

  


{ showQuantity &&

  <Additems  Id = {_id} Baseprice = {Baseprice} DiscountPrice = {DiscountPrice} />
  
}

  

 
  
</div>    
</form>


<div>


</div>
</div>
  )
}

export default Product