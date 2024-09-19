import {useEffect, useState} from "react";

export function useProfile() {
  const [data, setData] = useState(false);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch('/api/profile').then(response => {
      response.json().then(data => {
        setData(data);
        setLoading(false);
      });
    })
  }, []);

  return {Loading, data};
}