'use client'
import { useState, useEffect } from "react";

export function useMenuitems() {
  const [dataMenu, setDataMenu] = useState([]);
  

  const fetchData = async () => {
    try {
      const response = await fetch('/api/menu-items');
      const result = await response.json();
      setDataMenu(result);
     
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
  

  return { dataMenu,  refreshCart};
}
