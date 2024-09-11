import Vendor from "../models/Vendor.js";

export const update = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({ success: false, message: "You don't have access to update this" });
    }

    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendor) {
            return res.status(200).json({ success: false, message: "Vendor not found" });
        } else {
            res.status(200).json({ success: true, message: "Vendor updated successfully", data: vendor });
        }
    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
};

export const deleteVendor = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({ success: false, message: "You don't have access to delete this" });
    }

    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) {
            return res.status(200).json({ success: false, message: "Vendor not found" });
        } else {
            res.status(200).json({ success: true, message: "Vendor deleted successfully", data: vendor });
        }
    } catch (error) {
        return res.status(200).json({ success: false, message: error.message });
    }
};

export const getVendor = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({ success: false, message: "You don't have access to view this" });
    }
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(200).json({ success: false, message: "Vendor not found" });
        } else {
            return res.status(200).json({ success: true, message: "Vendor fetched successfully", data: vendor });
        }
    } catch (error) {
        return res.status(200).json({ success: false, message: error.message });
    }
};

export const addVendor = async (req, res, next) => {


  // Check if the user is super-admin, admin, or editor
  if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
    return res.status(403).json({ success: false, message: "You don't have access to create a new Vendor" });
  }

  const { name, email, phone, address } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !address) {
    return res.status(400).json({ success: false, message: "Please fill all required fields" });
  }

  try {
    // Check if vendor name exists
    const vendorExist = await Vendor.findOne({ name });
    if (vendorExist) {
      return res.status(200).json({ success: false, message: "Vendor already exists" });
    }

    const vendor = new Vendor({ name, email, phone, address });

    const savedVendor = await vendor.save();
    return res.status(200).json({
      success: true,
      message: "Vendor created successfully",
      data: savedVendor
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
  

export const getAllVendors = async (req, res, next) => {
  
    // Check if the user is super-admin or admin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({ success: false, message: "You don't have access to view this" });
    }

    try {
        const vendors = await Vendor.find();
        if (!vendors) {
            return res.status(200).json({ success: false, message: "No vendors found" });
        }
        res.status(200).json({ success: true, message: "Vendors fetched successfully!", data: vendors });
    } catch (error) {
        return res.status(200).json({ success: false, message: error.message });
    }
};


export const bulkDeleteVendors = async (req, res, next) => {
    
    console.log("Request body:", req.body);
       const { ids } = req.body;
       console.log("IDs to delete (backend):", ids); // Log IDs in backend
   
       if (!Array.isArray(ids) || ids.length === 0) {
           console.log("No Vendor IDs provided");
           return res.status(400).json({ success: false, message: "No Vendor IDs provided" });
       }
   
       try {
           const result = await Vendor.deleteMany({ _id: { $in: ids } });
           console.log("Deletion result:", result);
           if (result.deletedCount === 0) {
               console.log("No brands were deleted");
               return res.status(404).json({ success: false, message: "No Vendors were deleted" });
           }
   
           console.log("Vendor deleted successfully");
           return res.status(200).json({
               success: true,
               message: "Vendors deleted successfully",
               data: result
           });
       } catch (err) {
           console.error("Error during bulk delete:", err);
           return res.status(500).json({ success: false, message: err.message });
       }
   };
