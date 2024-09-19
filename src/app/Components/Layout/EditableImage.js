'use client'

import toast from "react-hot-toast";
import Image from "next/image";
export default function EditableImage ({link,setLink}) {
    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
          const data = new FormData;
          data.set('file', files[0]); 

           
          const uploadPromise = fetch('/api/upload', {
            method: 'POST',
            body: data,
          }) .then( async response => {
            if (response.ok) {
              return response.json().then( link => {
                setLink(link);
              })
            }
            throw new Error('Something went wrong');
          });
    
          await toast.promise(uploadPromise, {
            loading: 'Uploading...',
            success: 'Upload complete',
            error: 'Upload error',
          });
        }
      }
    return (
        <>
        <div className="text-center">
        {!link && (
          <div>No Image</div>
        )}
        </div>
        {link && (
            <Image className="rounded-lg mx-auto  mb-1" src={link} width={100} height={100} alt={"avatar"}/>
        )}
        <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
<span className=" w-[60px] mx-auto block border border-gray-300 rounded-lg p-2 text-center cursor-pointer mt-[3rem]">Edit</span>
  
</label>
        </>
    )
}
