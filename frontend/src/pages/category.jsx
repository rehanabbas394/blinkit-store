import { useState } from "react";
import UploadProduct from "./upload-product";

function Category() {
    const [openAddCategory, setOpenAddCategory ] = useState(false);
    return (
        <section>
            <div className="bg-white shadow-md p-2 flex items-center justify-between">
                <h2 className="font-semibold">Category</h2>
                <button onClick={()=> setOpenAddCategory(true)} className="text-md border border-primary-200 hover:bg-primary-200 rounded px-3 py-1">Add Category</button>
            </div>
            {
                openAddCategory && (
                    <UploadProduct close ={()=> setOpenAddCategory(false)}/>
                )
            }
        </section>
    ) 
}

export default Category;