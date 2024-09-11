import Category from "../models/Category.js";

export const createCategory = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to create a new Category"});
    }

    try {
        const category = new Category(req.body);
        await category.save();

        res.status(200).json({success: true, message: "Category created successfully", data: category});
    } catch (error) {
        return res.status(200).json({success: false, message: error.message});
    }
};

export const editCategory = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to update this"});
    }

    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!category) {
            return res.status(200).json({success: false, message: "Category not found"});
        }else{
            res.status(200).json({success: true, message: "Category updated successfully", data: category});
        }
    } catch (error) {
        res.status(200).json({success: false, message: error.message});
    }
};

export const deleteCategory = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to delete this"});
    }

    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(200).json({success: false, message: "Category not found"});
        }else{
            res.status(200).json({success: true, message: "Category deleted successfully", data: category});
        }
    } catch (error) {
        return res.status(200).json({success: false, message: error.message});
    }
};

// Bulk delete brands function
export const bulkDeleteCategories = async (req, res, next) => {
    
    console.log("Request body:", req.body);
       const { ids } = req.body;
       console.log("IDs to delete (backend):", ids); // Log IDs in backend
   
       if (!Array.isArray(ids) || ids.length === 0) {
           console.log("No brand IDs provided");
           return res.status(400).json({ success: false, message: "No brand IDs provided" });
       }
   
       try {
           const result = await Category.deleteMany({ _id: { $in: ids } });
           console.log("Deletion result:", result);
           if (result.deletedCount === 0) {
               console.log("No brands were deleted");
               return res.status(404).json({ success: false, message: "No brands were deleted" });
           }
   
           console.log("Categories deleted successfully");
           return res.status(200).json({
               success: true,
               message: "Categories deleted successfully",
               data: result
           });
       } catch (err) {
           console.error("Error during bulk delete:", err);
           return res.status(500).json({ success: false, message: err.message });
       }
   };

export const getCategories = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to view this"});
    }
    try {
        const categories = await Category.find();
        if(!categories){
            return res.status(200).json({success: false, message: "No categories found"});
        }
        res.status(200).json({success: true, message: "Categories fetched successfully!", data: categories});
    } catch (error) {
        return res.status(200).json({success: false, message: error.message});
    }
};

export const getCategory = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access"});
    }

    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(200).json({success: false, message: "Category not found"});
        }else{
            res.status(200).json({success: true, message: "Category fetched successfully!", data: category});
        }
    } catch (error) {
        res.status(200).json({success: false, message: error.message});
    }
}