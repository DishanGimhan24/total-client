import Brand from "../models/Brand.js";
import { getMediaUrl } from "../helpers/url-generate.js";

//create brand
export const createBrand = async (req, res, next) => {
    // Check if the user is super-admin or admin
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor"){
        return res.status(200).json({success: false, message: "You don't have access to create a new Brand"});
    }
    try{
        //check if brand name exists
        const brandExist = await Brand.findOne({name: req.body.name});
        if(brandExist){
            return res.status(200).json({success: false, message: "Brand already exists"});
        }
        const brand = new Brand({
            name: req.body.name,
            status: req.body.status,
            img: req.file.path
        });

        if(!brand){
            return res.status(200).json({success: false, message: "Brand not created"});
        }else{
            brand.save();
            return res.status(200).json({
                success: true,
                message: "Brand created successfully",
                data: brand
            });
        }
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

//edit brand
export const editBrand = async (req, res, next) => {
    // Check if the user is super-admin or admin
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to update this"});
    }

    try{
        req.body = {
            name: req.body.name,
            status: req.body.status,
            img: req.file.path
        }
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!brand){
            return res.status(200).json({success: false, message: "Brand not found"});
        }else{
            brand.save();
            return res.status(200).json({
                success: true,
                message: "Brand updated successfully",
                data: brand
            });
        }
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

//delete brand
export const deleteBrand = async (req, res, next) => {
    // Check if the user is super-admin or admin
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to delete this"});
    }

    try{
        const brand = await Brand.findByIdAndDelete(req.params.id);
        if(!brand){
            return res.status(200).json({success: false, message: "Brand not found"});
        }

        return res.status(200).json({
            success: true,
            message: "Brand deleted successfully",
            data: brand
        });
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

// Bulk delete brands function
export const bulkDeleteBrands = async (req, res, next) => {

    const { ids } = req.body;
   
       if (!Array.isArray(ids) || ids.length === 0) {
           console.log("No brand IDs provided");
           return res.status(400).json({ success: false, message: "No brand IDs provided" });
       }
   
       try {
           const result = await Brand.deleteMany({ _id: { $in: ids } });
           console.log("Deletion result:", result);
           if (result.deletedCount === 0) {
               console.log("No brands were deleted");
               return res.status(404).json({ success: false, message: "No brands were deleted" });
           }
           return res.status(200).json({
               success: true,
               message: "Brands deleted successfully",
               data: result
           });
       } catch (err) {
           console.error("Error during bulk delete:", err);
           return res.status(500).json({ success: false, message: err.message });
       }
   };


//get all brands
export const getAllBrands = async (req, res, next) => {
    // Check if the user is super-admin or admin
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to view this"});
    }

    try{
        const brands = await Brand.find();
        if(!brands){
            return res.status(200).json({success: false, message: "No Brands found"});
        }

        //before send them, get media urls for all medias in this data
        brands.map(brand => {
            brand.img = getMediaUrl(brand.img);
        });
        //now append the media url to the data.img instead of the path
        return res.status(200).json({
            success: true,
            message: "Brands retrieved successfully",
            data: brands
        });
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

//get a brand
export const getBrand = async (req, res, next) => {
    // Check if the user is super-admin or admin
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access"});
    }

    try{
        const brand = await Brand.findById(req.params.id);
        if(!brand){
            return res.status(200).json({success: false, message: "Brand not found"});
        }

        return res.status(200).json({
            success: true,
            message: "Brand retrieved successfully",
            data: brand
        });
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};