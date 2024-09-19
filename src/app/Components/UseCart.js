'use client'
import { useState, useEffect } from "react";

export function useCart() {
  const [data, setData] = useState([]);
  

  const fetchData = async () => {
    try {
      const response = await fetch('/api/cart-items');
      const result = await response.json();
      setData(result);
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
  

  return { data,  refreshCart};
}
