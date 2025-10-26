import { IoClose } from "react-icons/io5";
import { useState } from "react";
import uploadImage from "../utils/uploadImage";
import AxiosToastError from "../utils/Axios-toast-error";
import { Axios } from "../utils/Axios";
import Api_endpoints from "../common/api-details";
import toast from "react-hot-toast";

function AddCategoryProduct({ close, fetchData }) {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  console.log("data in upload category", data);
  const [loading, setLoading] = useState(false);

  const hundleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hundleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const response = await Axios({
            ...Api_endpoints.addCategory,
            data: {
                name: data.name,
                image: data.image
            }
        });
        console.log("response from add category", response);
        if(response.data.success) {
            toast.success(response.data.message);
            if(close) {
                close();
            }
            if(fetchData) {
                fetchData();
            }
        } else {
            toast.error(response.data.message);
        }
        
    } catch (error) {
        AxiosToastError(error);
    } finally {
        setLoading(false);
    }
  };

  const hundleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file);
      console.log("response from upload image", response);
      console.log("url", response?.data?.data.url);
      if (response && response.data) {
        setData((prev) => ({
          ...prev,
          image: response?.data?.data?.url
        }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 bg-opacity-50 p-4 flex items-center justify-center">
      <div className="bg-white max-w-3xl w-full p-4 rounded">
        <div className="flex items-center justify-between border-b">
          <h1 className="font-semibold">Category</h1>
          <button onClick={close} className="block w-fit ml-auto">
            <IoClose size={25} />
          </button>
        </div>

        <form onSubmit={hundleSubmit} className="my-3 grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name:</label>
            <input
              type="text"
              placeholder="Category Name"
              name="name"
              id="categoryName"
              value={data.name}
              onChange={hundleChange}
              className="bg-blue-50 border border-blue-200 rounded px-3 py-1 outline-none focus:border-primary-200"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Category Image"
                    className="h-full w-full object-scale-down rounded"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
                            ${
                              !data.name
                                ? "bg-gray-200"
                                : "border-primary-200 hover:bg-primary-100"
                            }  
                                font-semibold px-4 py-2 rounded cursor-pointer border font-medium
                            `}
                >
                  Upload Image
                </div>
              </label>
              <input
                disabled={!data.name}
                type="file"
                name="image"
                id="uploadCategoryImage"
                onChange={hundleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <button
            className={`
                    ${
                      data.name && data.image
                        ? "bg-primary-200 hover:bg-primary-100"
                        : "bg-gray-300 "
                    }
                    py-2    
                    font-semibold 
                    `}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddCategoryProduct;
