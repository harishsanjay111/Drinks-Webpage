'use client'
import { useState, useEffect } from "react";
import "./Additem.css";
import toast from "react-hot-toast";
import { useCart } from '../../../Components/UseCart';
import { useDispatch,useSelector } from "react-redux";
import { cartactions } from "@/app/store/cart-slice";
const Additems = ({Id,Baseprice,DiscountPrice}) => {
  const { data, refreshCart } = useCart();
  const [handleDeleteCart,sethandleDeleteCart] = useState(false);
  const dispatch = useDispatch();
  const Itemdata = useSelector(state => state.cart.itemdata);
  const DeleteCartData = useSelector(state => state.cart.DeleteCartData);
  console.log(Id);
  const foundItem = Itemdata.find(item => item.id === Id);
  useEffect(() => {

    if(!DeleteCartData) {
      foundItem.quantity === 0;
    }
      
    
    if (foundItem && foundItem.quantity === 0) {
      sethandleDeleteCart(true);
    } else {
      sethandleDeleteCart(false);
    }
  }, [foundItem]);
  const handleIncrement = async (ev,id) => {
    ev.preventDefault();
    const incrementQuantity = foundItem? foundItem.quantity + 1 : 1;
    const updateData = {_id:id,quantity:incrementQuantity}
   await handleCartQuantity(updateData);
    dispatch(
      cartactions.handleIncrement({
      id:Id,
      Baseprice,
      DiscountPrice,
      
    }))
  };
  const handleDecrement = async (ev,id) => {
    ev.preventDefault();
     // Delete from Database
      if(handleDeleteCart) {
        const promise = new Promise(async(resolve,reject) => {
          const res = await fetch('/api/cart-items?_id='+ Id, {
            method : 'DELETE',
    
          });
          if(res.ok) {
            resolve();
            console.log("Item Deleted");
            await refreshCart();
          }
          else{
            reject();
          }
        });
        toast.dismiss();
      await toast.promise(promise , {
        loading : 'Deleting...', 
        success : 'Deleted',
        error : 'Error',
      })
      }
     
    dispatch(
      cartactions.handleDecrement({
      id:Id,
    }))

   console.log(Id);
   const decrementQuantity = foundItem? foundItem.quantity - 1  : 1;
   const updateData = {_id:id,quantity:decrementQuantity}
      await handleCartQuantity(updateData);

     
     

      
      
      
  };
  const handleCartQuantity = async (updatedData) => {
    
    
    try {
      const response = await fetch('/api/cart-items', {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers: { 'Content-Type': 'application/json' },
      });
      toast.dismiss();
      if (response.ok) {
        toast.success('Quantity Updated');
      
      } else {
        toast.error('Error Updating Quantity');
      }
    } catch (error) {
      toast.error('Error Updating Quantity');
    }
    await refreshCart();
  };
  
    
  

  

  return (
    <div className="Quantity">
    
             
    
    <form onChange={handleCartQuantity}>
   
    <div>
    
      <div  className="item-container flex gap-5">
        
      <button type="button" onClick={(ev) =>handleDecrement(ev,Id)}>-</button> 
      {
        data.filter((item) => item._id === Id).map((item) => (
          <div key={item._id}>
            {item.quantity}
          </div>
        ))
      }
         
       
      
  <button type="button" onClick={(ev) => handleIncrement(ev,Id)}>+</button>
    
    
  
   
      </div>
  
        
       
        </div>
  
    
  
    
   
    
  
    
          </form>
    
    </div>
  );
};

export default Additems;
