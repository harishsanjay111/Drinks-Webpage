'use client'
'use client'
import { useState, useEffect } from "react";

export function useTotalcart() {
  const [Carttotaldata, setCarttotaldata] = useState([]);
  

  const fetchData = async () => {
    try {
      const response = await fetch('/api/cart-total');
      const result = await response.json();
      setCarttotaldata(result);
     
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const refreshCart = async () => {
    await fetchData();
  };
  

  return { Carttotaldata,  refreshCart};
}
