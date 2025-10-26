import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Loading from "../component/loading";
import uploadImage from "../utils/uploadImage";
import ViewImage from "../component/viewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../component/addField";
import AxiosToastError from "../utils/Axios-toast-error";
import Api_endpoints from "../common/api-details";
import { Axios } from "../utils/Axios";
import successAlert from "../utils/successAlert";

function UploadProduct() {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const hundleUploadedImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageLoading(true);

    const response = await uploadImage(file);
    const { data: imageData } = response;
    const imgURL = imageData.data.url;
    console.log(imgURL);
    console.log(data);

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imgURL],
      };
    });
    setImageLoading(false);
  };

  const hundleDeleteImage = (index) => () => {
    setData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveCategory = (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        category: [...data.category],
      };
    });
  };

  const handleRemoveSubCategory = (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        category: [...data.subCategory],
      };
    });
  };

   const handleAddField = () => {
      setData((prev) => {
         return {
             ...prev,
               more_details: {
                   ...prev.more_details,
                     [fieldName]: "",
               },
         };
      });
      setFieldName("");
      setOpenAddField(false);
   }

   const hundleUploadProduct = async (e) => {
     e.preventDefault();
     try {
      const response = await Axios({
         ...Api_endpoints.createProduct,
         data : data
      })
      console.log("response from create product", response);
      const { data : responseData } = response;
      if(responseData.success){
          successAlert(responseData.message)
          setData({
            name : "",
            image : [],
            category : [],
            subCategory : [],
            unit : "",
            stock : "",
            price : "",
            discount : "",
            description : "",
            more_details : {},
          })

      }
     } catch (error) {
      console.log("error", error);
      AxiosToastError(error);
     }
   }

  // console.log(data);
  return (
    <section>
      <div className="p-2   bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="p-4 grid">
        <form className="grid gap-4" onSubmit={hundleUploadProduct}>
          {/* name field */}
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter product name"
              name="name"
              value={data.name}
              required
              onChange={handleChange}
              className="p-2 bg-blue-50 border focus-within:border-primary-200 outline-none rounded"
            />
          </div>
          {/* description */}
          <div className="grid gap-1">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              placeholder="Enter product description"
              name="description"
              value={data.description}
              onChange={handleChange}
              multiple
              rows={3}
              className="p-2 bg-blue-50 border focus-within:border-primary-200 outline-none rounded resize-none"
            />
          </div>

          {/* image field */}
          <div className="grid gap-1">
            <p className="font-medium">Image</p>
            <label
              htmlFor="productImage"
              className="bg-blue-50 flex justify-center items-center h-24 border rounded"
            >
              <div className="flex flex-col justify-center items-center gap-1 text-center">
                {imageLoading ? (
                  <Loading />
                ) : (
                  <>
                    <FaCloudUploadAlt size={35} />
                    <p>Upload Image</p>
                  </>
                )}
              </div>
              <input
                type="file"
                id="productImage"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={hundleUploadedImage}
              />
            </label>

            {/**display uploaded images*/}
            <div className="flex flex-wrap gap-2 mt-2">
              {data.image.map((img, index) => {
                return (
                  <div
                    key={`${img}-${index}`}
                    className="relative group h-20 w-20 bg-blue-50 border rounded overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`product-${index}`}
                      className="w-full h-full object-scale-down cursor-pointer"
                      onClick={() => setViewImageURL(img)}
                    />
                    <button
                      type="button"
                      onClick={hundleDeleteImage(index)}
                      className="absolute top-1 right-1 bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
                    >
                      <MdDelete className="text-red-500" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* category */}
          <div className="grid gap-1">
            <p className="font-medium">Category</p>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);

                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    };
                  });
                  setSelectCategory("");
                }}
              >
                <option value={""}>Select Category</option>
                {allCategory.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* sub Category */}
          <div className="grid gap-1">
            <p className="font-medium">Sub Category</p>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCcategory = allSubCategory.find(
                    (el) => el._id === value
                  );

                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCcategory],
                    };
                  });
                  setSelectCategory("");
                }}
              >
                <option value={""}>Select Category</option>
                {allSubCategory.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* unit */}
          <div className="grid gap-1">
            <label htmlFor="unit" className="font-medium">
              Unit
            </label>
            <input
              id="unit"
              type="text"
              placeholder="Enter product unit"
              name="unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* stock */}
          <div className="grid gap-1">
            <label htmlFor="stock" className="font-medium">
              Number of Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter product stock"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* price */}
          <div className="grid gap-1">
            <label htmlFor="price" className="font-medium">
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter product price"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* discount */}
          <div className="grid gap-1">
            <label htmlFor="discount" className="font-medium">
              Discount
            </label>
            <input
              id="discount"
              type="number"
              placeholder="Enter product discount"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          {/* add more field */}
          {Object?.keys(data?.more_details)?.map((k, index) => {
            return (
              <div className="grid gap-1">
                <label htmlFor={k} className="font-medium">
                  {k}
                </label>
                <input
                  id={k}
                  type="text"
                  value={data?.more_details[k]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((preve) => {
                      return {
                        ...preve,
                        more_details: {
                          ...preve.more_details,
                          [k]: value,
                        },
                      };
                    });
                  }}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
            );
          })}

          <div
            onClick={() => setOpenAddField(true)}
            className=" hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded"
          >
            Add Fields
          </div>

          <button className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold">
            Submit
          </button>
        </form>
      </div>
      {viewImageURL && (
        <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
      )}

      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
}

export default UploadProduct;
