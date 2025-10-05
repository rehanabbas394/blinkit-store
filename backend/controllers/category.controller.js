import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

export const AddCategoryController = async(request,response)=>{
    try {
        const { name , image } = request.body 

        if(!name || !image){
            return response.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        const addCategory = new CategoryModel({
            name,
            image
        })

        const saveCategory = await addCategory.save()

        if(!saveCategory){
            return response.status(500).json({
                message : "Not Created",
                error : true,
                success : false
            })
        }

        return response.json({
            message : "Add Category",
            data : saveCategory,
            success : true,
            error : false
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getCategoryController = async(request,response)=>{
    try {
        
        const data = await CategoryModel.find().sort({ createdAt : -1 })

        return response.json({
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.messsage || error,
            error : true,
            success : false
        })
    }
}

export const updateCategoryController = async(request,response)=>{
    try {
        const { _id, name, image } = request.body 

        if (!_id || !name || !image) {
            return response.status(400).json({
                message: "Missing required fields",
                success: false,
                error: true
            });
        }

        const update = await CategoryModel.updateOne(
            { _id: _id },
            { name, image }
        );

        if (update.matchedCount === 0) {
            return response.status(404).json({
                message: "Category not found",
                success: false,
                error: true
            });
        }

        if (update.modifiedCount === 0) {
            return response.status(400).json({
                message: "No changes made to the category",
                success: false,
                error: true,
                data: update
            });
        }

        return response.json({
            message: "Category updated successfully",
            success: true,
            error: false,
            data: update
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteCategoryController = async(request,response)=>{
    try {
        const { _id } = request.body 

        if (!_id) {
            return response.status(400).json({
                message: "Category ID is required",
                error: true,
                success: false
            });
        }

        const checkSubCategory = await SubCategoryModel.find({
            category: { "$in": [_id] }
        }).countDocuments();

        const checkProduct = await ProductModel.find({
            category: { "$in": [_id] }
        }).countDocuments();

        if(checkSubCategory > 0 || checkProduct > 0) {
            return response.status(400).json({
                message: "Cannot delete category - it has associated subcategories or products",
                error: true,
                success: false
            });
        }

        const deleteResult = await CategoryModel.deleteOne({ _id: _id });

        if (deleteResult.deletedCount === 0) {
            return response.status(404).json({
                message: "Category not found",
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            message: "Category deleted successfully",
            data: deleteResult,
            error: false,
            success: true
        })

    } catch (error) {
       return response.status(500).json({
            message : error.message || error,
            success : false,
            error : true
       }) 
    }
}