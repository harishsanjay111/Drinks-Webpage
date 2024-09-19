import React from "react";
import Product from "./Product";

import { useState,useEffect } from "react";
import {useMenuitems} from "../../../Components/UseMenuitems"
const Products =  () => {
const {dataMenu} = useMenuitems();
  

  return (
    <div>
      <ul className="products-container">
      {dataMenu?.length > 0  && dataMenu.map((item) => (
        <div key={item._id}>
        <Product {...item} 
         
        />
        </div>
      )
        
      )}
       
          
      </ul>
    </div>
  );
  
};

export default Products;

// const DUMMY_PRODUCTS = [
//   {
//     id: 1,
//     name: "Mirinda Orange 2.25 L",
//     imgURL:
//     "./mirinda.png",
//     DiscountPrice: 65,
//     price: 100,
//     offer: "35% OFF",
//     quantity : 1
//   },
//   {
//     id: 2,
//     name: "Coca Cola 2.25 L",
//     imgURL: "./cocacola.png",
//     DiscountPrice: 60,
//     price: 85,
//     offer: "29% OFF",
//     quantity : 1
//   },
//   {
//     id: 3,
//     name: "Pepsi 2.25 L",
//     imgURL:"pepsi.png",
//     DiscountPrice: 65,
//     price: 100,
//     offer: "35% OFF",
//     quantity : 1
//     },
//   {
//     id: 4,
//     name: "Maaza Mango 600 ml",
//     imgURL: "maaza.png",
//     DiscountPrice: 32,
//     price: 42,
//     offer: "34% OFF",
//     quantity : 1
//     },
//   {
//     id: 5,
//     name: "Diet coke 300ml",
//     imgURL: "coke.png",
//     DiscountPrice: 26,
//     price: 40,
//     offer: "35% OFF",
//     quantity : 1
//     },
//   {
//     id: 6,
//     name: "Mountain Dew 250 ml",
//     imgURL:"mountaindew.png",
//     DiscountPrice: 27,
//     price: 35,
//     offer: "22% OFF",
//     quantity : 1
//     },
//   {
//     id: 7,
//     name: "Red Bull 350ml",
//     imgURL: "redbull.png",
//     DiscountPrice: 150,
//     price: 165,
//     offer: "9% OFF",
//     quantity : 1
//     },
//   {
//     id: 8,
//     name: "Acer Aspire",
//     imgURL:"redbull2.png",
//     DiscountPrice: 99,
//     price: 125,
//     offer: "20% OFF",
//     quantity : 1
//     },
//   {
//     id: 9,
//     name: "Acer Aspire",
//     imgURL:"./redbullyellow.png",
//     DiscountPrice: 99,
//         price: 125,
//         offer: "20% OFF",
//         quantity : 1
//         },
//   {
//     id: 10,
//     name: "Fanta Soft Drink 300ml",
//     imgURL:"/fanta.png",
//     DiscountPrice: 38,  
//     price: 40,
//     offer: "5% OFF",
//     quantity : 1
//     },
//   {
//     id: 11,
//     name: "Acer Aspire",
//     imgURL:"./cocacolazero.png",
//     DiscountPrice: 36,
//     price: 40,
//     offer: "10% OFF",
//     quantity : 1
//     },
//   {
//     id: 12,
//     name: "JIMMY'S COCKTAIL 250ml",
//     imgURL:"jimmy.png",
//     DiscountPrice: 92,
//     price: 99,
//     offer: "35% OFF",
//     quantity : 1
//     },
// ];