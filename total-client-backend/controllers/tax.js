import Tax from "../models/Tax.js";

//create tax
export const createTax = async (req, res) => {
    //check if user is admin, superadmin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({ success: false, message: "You don't have access to create a new Tax" });
    }
    try {
        //check if tax already exists
        const taxExists = await Tax.findOne({ name: req.body.name });
        if (taxExists) {
            return res.status(200).json({ success: false, message: "Tax name already exists" });
        }
        //create tax
        const tax = await new Tax(req.body);
        if (tax) {
            tax.save();
            return res.status(200).json({ success: true, message: "Tax created successfully", data: tax });
        } else {
            return res.status(200).json({ success: false, message: "Tax not created" });
        }
    } catch (err) {
        return res.status(200).json({ success: false, message: err.message });
    }
};

//edit tax
export const editTax = async (req, res) => {
    //check if user is admin, superadmin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({ success: false, message: "You don't have access to update this" });
    }

    try {
        //check if tax is exist by id
        const tax = await Tax.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (tax) {
            tax.save();
            return res.status(200).json({ success: true, message: "Tax updated successfully", data: tax });
        } else {
            return res.status(200).json({ success: false, message: "Tax not found" });
        }
    } catch (err) {
        return res.status(200).json({ success: false, message: err.message });
    }
};

//delete tax
export const deleteTax = async (req, res) => {
    //check if user is admin, superadmin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({ success: false, message: "You don't have access to delete this" });
    }

    try {
        //check if tax is exist by id
        const tax = await Tax.findByIdAndDelete(req.params.id);
        if (tax) {
            return res.status(200).json({ success: true, message: "Tax deleted successfully" });
        } else {
            return res.status(200).json({ success: false, message: "Tax not found" });
        }
    } catch (err) {
        return res.status(200).json({ success: false, message: err.message });
    }
};

//get all taxes
export const getAllTaxes = async (req, res) => {
    try {
        const taxes = await Tax.find();
        if (taxes) {
            return res.status(200).json({ success: true, message: "All taxes", data: taxes });
        } else {
            return res.status(200).json({ success: false, message: "No taxes found" });
        }
    } catch (err) {
        return res.status(200).json({ success: false, message: err.message });
    }
};

//get a tax
export const getTax = async (req, res) => {
    try {
        const tax = await Tax.findById(req.params.id);
        if (tax) {
            return res.status(200).json({ success: true, message: "Tax found", data: tax });
        } else {
            return res.status(200).json({ success: false, message: "Tax not found" });
        }
    } catch (err) {
        return res.status(200).json({ success: false, message: err.message });
    }
};


export const bulkDeletetaxes = async (req, res, next) => {
    
    console.log("Request body:", req.body);
       const { ids } = req.body;
       console.log("IDs to delete (backend):", ids); // Log IDs in backend
   
       if (!Array.isArray(ids) || ids.length === 0) {
           console.log("No tax IDs provided");
           return res.status(400).json({ success: false, message: "No tax IDs provided" });
       }
   
       try {
           const result = await Tax.deleteMany({ _id: { $in: ids } });
           console.log("Deletion result:", result);
           if (result.deletedCount === 0) {
               console.log("No Tags were deleted");
               return res.status(404).json({ success: false, message: "No Taxs were deleted" });
           }
   
           console.log("Taxs deleted successfully");
           return res.status(200).json({
               success: true,
               message: "Taxs deleted successfully",
               data: result
           });
       } catch (err) {
           console.error("Error during bulk delete:", err);
           return res.status(500).json({ success: false, message: err.message });
       }
   };