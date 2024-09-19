'use client'

import "./categories.css"
import UserTabs from  "../Components/Layout/UserTabs/UserTabs"
import {useProfile} from "../Components/UseProfile"
import { useEffect, useState } from "react";
import DeleteButton from "../Components/DeleteButton";
import toast from "react-hot-toast";
export default function CategoriesPage () {

 const {Loading:profileLoading, data:Profiledata} = useProfile();
 const [CategoryName, setCategoryName ] = useState('');
const [categories,setcategories] = useState([]);
const [editedCategory,seteditedCategory] = useState(null)

console.log(editedCategory);
useEffect(() => {
    fetchCategories();
},[])

function fetchCategories() {
    fetch('api/categories').then(res => {
        res.json().then(categories => {
            setcategories(categories);
        }); 
        });
}


const handleCategorySubmit = async (ev) => {
ev.preventDefault();
const creationPromise  =  new Promise (async (resolve,reject) => {
    const data = {name:CategoryName}
    
    if (editedCategory) {
        data._id = editedCategory._id;
    }
    
const response = await fetch('api/categories', {
    method : editedCategory ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
});
setCategoryName('');
fetchCategories();
seteditedCategory(null);
if(response.ok)
    resolve(); 

else
    reject();

});
 toast.dismiss();
await toast.promise (creationPromise,  {
   
    loading : "Creating your new Category...",
    success :'Category created',
    error : "Error sorry...",
})

}




async function  handleClickDelete(_id) {
    const promise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/categories?_id='+_id, { 
            method : 'DELETE',

        });
        if(response.ok){
            resolve();
        }
        else{
            reject();
        }
    });
    toast.dismiss();

    await toast.promise(promise,  {
        
        loading : 'Deleting...',
        success :'Deleted',
        error : 'Error',
    })
    
    fetchCategories();
}

 if(profileLoading){
    return "Loading user Info...."
 }
    
 if(!Profiledata.admin){
    return "Not an Admin...."
 }
 
 return(

        <section className="mt-8 max-w-2xl mx-auto">

        <UserTabs isAdmin={true}/>  
        <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
        <div className="grow">
        <label> {editedCategory ? 'Update Category Name' : "New Category Name"}: {editedCategory && (
             <b>{editedCategory.name}</b>
          )}</label>
        <input value={CategoryName} onChange={ev =>setCategoryName(ev.target.value)}  className="block w-full rounded-xl mb-2 p-2 border border-gray-300 bg-gray-200" type="text" />
        </div>
        <div className="pb-2 flex gap-2">
        <button  type="submit" className="create-btn btn  h-[2.6rem] rounded-xl">
        {editedCategory ? 'Update' : "Create"}
        </button>
        <button type="button" className="btn" onClick={() =>  {
seteditedCategory(null);
            setCategoryName('');
        } }>Cancel</button>
        </div>
        
        </div>
        
        </form>
        <ul>
        <h2 className="mt-8 text-sm text-gray-500">Existing category:</h2>
        {categories?.length > 0 && categories.map(c => (
            <div
            key={c._id}
            
            className="bg-gray-100 rounded-xl p-2 p-4 flex gap-1 mb-1">
            
           
<div className="grow hover:underline cursor-pointer gap-2">
                <div className="grow"  

                >{c.name}</div>
                    </div>
            <div className="gap-2 flex">
            <button className="btn" onClick={() => { seteditedCategory(c); 
                setCategoryName(c.name); } } >Edit</button>
                <DeleteButton label={'Delete'} onDelete={()=> handleClickDelete(c._id)}/>
            </div>
            </div>
            ))}
        
        </ul>
        </section>
    )
}