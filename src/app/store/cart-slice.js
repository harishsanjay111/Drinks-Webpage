'use client'
import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice( {
    name : "cart",

    initialState : {   
     itemdata : [],
     totalMrp : 0,
 totalQuantity : 0,   
 ShowTotal : false,  
 YouSave : 0,
 DeleteCartData : false,
 showQuantity : false,
 
},
    reducers : {
        addTocart (state,action) {
          
         state.ShowTotal = true;
           const newItem = action.payload 
           
                   
           const existingItem = state.itemdata.some(item => item.id === newItem.id);  
          
           if(existingItem) {
            existingItem.total += newItem.Baseprice;
            state.showQuantity = true,
            existingItem.DiscountCartPrice += newItem.DiscountPrice;
           }
           else{
             state.itemdata.push({
                id : newItem.id,
                Name : newItem.Name,
                image : newItem.image,
                DiscountPrice : newItem.DiscountPrice,
                DiscountCartPrice : newItem.DiscountPrice,
                price : newItem.Baseprice,       
                total : newItem.Baseprice,
                Baseprice : newItem.Baseprice,
                quantity : newItem.quantity,
                PercentageOFF : newItem.PercentageOFF,
                
                  
                
              
              })
           }
      
          state.YouSave = newItem.price
           state.totalQuantity++
           state.itemdata = state.itemdata
         
           
           
        },
        removefromcart (state,action) {
          

const id = action.payload;

 


const existingitem = state.itemdata.find(item => item.id === id);

  if (existingitem.quantity === 0) {
     state.itemdata = state.itemdata.filter(item => item.id !== id);
    
    state.YouSave = 0
    existingitem.DiscountCartPrice = 0
    
    
    
  }
  else{
    existingitem.quantity--;
     existingitem.total -= existingitem.price;
    existingitem.DiscountCartPrice -= existingitem.DiscountPrice;
    
  }
  
  state.totalQuantity--;
  if (state.itemdata.length === 0) {
    state.ShowTotal = false; 
   
}

        },
       
        handleIncrement (state,action) {
          
const IncrementData = action.payload;
          const IncrementItem = state.itemdata.find(item => item.id === IncrementData.id);
    if(IncrementItem) {
      IncrementItem.quantity++;
      IncrementItem.total += IncrementItem.Baseprice;
      IncrementItem.DiscountCartPrice += IncrementItem.DiscountPrice;
      state.showQuantity = true;
    }
   
    
        },
        handleDecrement(state,action) {
          const decrementData = action.payload;
         const DecrementItem = state.itemdata.find(item => item.id === decrementData.id);
      
       if (DecrementItem.quantity === 0) {
        state.itemdata = state.itemdata.filter(item => item.id !== DecrementItem.id);
        state.itemdata.quantity = 0;
        
        
      }
      else{
        DecrementItem.quantity--;
        DecrementItem.total -= DecrementItem.price;
        DecrementItem.DiscountCartPrice -= DecrementItem.DiscountPrice;
        
      }

        },
        handlePlaceOrder(state,action) {
        const TotalPlaceHolder = action.payload;
          state.totalMrp = TotalPlaceHolder.DiscountCartPrice
        },
        clearCart(state) {
          state.itemdata = [];
          state.totalMrp = 0;
          state.totalQuantity = 0;
          state.ShowTotal = false;
          state.YouSave = 0;
          state.DeleteCartData = true;
          
        },
    
  }

})
export  const cartactions = CartSlice.actions;
export default CartSlice.reducer;