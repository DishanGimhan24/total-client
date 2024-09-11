import Attribute from "../models/Attribute.js";

export const createAttribute = async (req, res, next) => {
    // Check if the user is super-admin or admin
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to create a new Attribute"});
    }

    try{
        const attribute = new Attribute(req.body);
        if(!attribute){
            return res.status(200).json({success: false, message: "Attribute not created"});
        }else{
            await attribute.save();
            return res.status(200).json({
                success: true,
                message: "Attribute created successfully",
                data: attribute
            });
        }
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

export const editAttribute = async (req, res, next) => {
    // Check if the user is super-admin or admin
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to update this"});
    }

    try{
        const attribute = await Attribute.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).json({
            success: true,
            message: "Attribute updated successfully",
            data: attribute
        });
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

export const deleteAttribute = async (req, res, next) => {
    // Check if the user is super-admin or admin
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to delete this"});
    }

    try{
        const attribute = await Attribute.findByIdAndDelete(req.params.id);
        if(!attribute){
            return res.status(200).json({success: false, message: "Attribute not found"});
        }

        return res.status(200).json({
            success: true,
            message: "Attribute deleted successfully",
            data: attribute
        });
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

export const getAttribute = async (req, res, next) => {
    // Check if the user is super-admin or admin
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access"});
    }
    try{
        const attribute = await Attribute.findById(req.params.id);
        if(!attribute){
            return res.status(200).json({success: false, message: "Attribute not found"});
        }

        return res.status(200).json({
            success: true,
            message: "Attribute fetched successfully!",
            data: attribute
        });
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

export const getAttributes = async (req, res, next) => {
    // Check if the user is super-admin or admin
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access"});
    }
    try{
        const attributes = await Attribute.find();
        return res.status(200).json({
            success: true,
            message: "Attributes fetched successfully!",
            data: attributes
        });
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

export const bulkDeleteAttributes = async (req, res, next) => {
    
    console.log("Request body:", req.body);
       const { ids } = req.body;
       console.log("IDs to delete (backend):", ids); // Log IDs in backend
   
       if (!Array.isArray(ids) || ids.length === 0) {
           console.log("No attribute IDs provided");
           return res.status(400).json({ success: false, message: "No attribute IDs provided" });
       }
   
       try {
           const result = await Attribute.deleteMany({ _id: { $in: ids } });
           console.log("Deletion result:", result);
           if (result.deletedCount === 0) {
               console.log("No attribute were deleted");
               return res.status(404).json({ success: false, message: "No attribute were deleted" });
           }
   
           console.log("attributes deleted successfully");
           return res.status(200).json({
               success: true,
               message: "attributes deleted successfully",
               data: result
           });
       } catch (err) {
           console.error("Error during bulk delete:", err);
           return res.status(500).json({ success: false, message: err.message });
       }
   }