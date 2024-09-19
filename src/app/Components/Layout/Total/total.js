import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useTotalcart } from "../../../Components/UseTotalCart";
import { cartactions } from "@/app/store/cart-slice";
import "./Total.css";
import Link from "next/link";

const Total = () => {
  const { Carttotaldata, refreshCart } = useTotalcart();
  const dispatch = useDispatch();

  // Extracting the first cart item _id (assuming only one cart total)
  const CartTotalItem = Carttotaldata[0];
  const CartTotalId = CartTotalItem?._id;

  // State to hold calculated totals
  const [totals, setTotals] = useState({
    TotalMrp: 0,
    Discount: 0,
    Total: 0,
  });

  const ItemsData = useSelector(state => state.cart.itemdata);

  // Calculate totals whenever ItemsData changes
    let Total = 0;
    let DiscountCartPrice = 0;

    ItemsData.forEach((item) => {
      Total += item.total;
      DiscountCartPrice += item.DiscountCartPrice;
    });

    const YouSave = Total - DiscountCartPrice;

    // Update the state with the calculated totals


  // Function to update the cart total data in the database
  function HandlePlaceHolder () {
dispatch (
  cartactions.handlePlaceOrder({
    DiscountCartPrice
  })
)
  }

  return (
    <div>
      <div className="text-[22px] max-[768px]:text-[12px] font-bold pb-[1rem]">Payment details</div>
      
        <div  className="order-total">
          <div>Total MRP: {Total}</div>
          <div>Discount: You Save {YouSave}</div>
          <div>Delivery Fee: FREE</div>
          <section className="pt-[2rem]">Total: {DiscountCartPrice}</section>
        </div>
      
      
      <div className="order-btn max-[768px]:mt-[1rem] mt-[2rem]">
      
       
        <a className="mx-auto  max-[768px]:py-1 py-2 tracking-[1px]  justify-center flex"  href={'/Checkout'} onClick={HandlePlaceHolder}>
          Place Order
          </a>
   
      </div>
    </div>
  );
}

export default Total;
