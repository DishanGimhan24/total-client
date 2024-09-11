import Customer from '../models/Customer.js';

//add customer
export const addCustomer = async (req, res, next) => {

    

    //check if user or admin logged in
    const customer = new Customer(req.body);
    try {
        await customer.save();
        res.status(200).json({ success: true, message: 'Customer added successfully', data: customer });
    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
};

//update customer by id
export const updateCustomer = async (req, res, next) => {

    //check if user super admin or admin
//if (req.user.role !== "super-admin" && req.user.role !== "admin") {
    ////    return res.status(200).json({ success: false, message: "You don't have access to update this" });
 //   }
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id);
        if (customer) {
            await customer.updateOne(req.body);
            res.status(200).json({ success: true, message: 'Customer updated successfully', data: customer });
        } else {
            res.status(200).json({ success: false, message: 'Customer not found' });
        }
    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }

};

//delete customer by id
export const deleteCustomer = async (req, res, next) => {

    //check if user super admin or admin
///  //  if (req.user.role !== "super-admin" && req.user.role !== "admin") {
      ///  return res.status(200).json({ success: false, message: "You don't have access to delete this" });
  //  }
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (customer) {
            res.status(200).json({ success: true, message: 'Customer deleted successfully', data: customer });
        } else {
            res.status(200).json({ success: false, message: 'Customer not found' });
        }
    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
};

//get customer by id
export const getCustomer = async (req, res, next) => {

    //check if user super admin or admin
   // if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
       // return res.status(200).json({ success: false, message: "You don't have access" });
   // }
    try {
        const customer = await Customer.findById(req.params.id);
        if (customer) {
            res.status(200).json({ success: true, data: customer });
        } else {
            res.status(200).json({ success: false, message: 'Customer not found' });
        }
    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
};

//get all customers
export const getCustomers = async (req, res, next) => {

    //check if user super admin or admin


    try {
        const customers = await Customer.find();
        res.status(200).json({ success: true, message: "Customers fetched successfully", data: customers });
    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
};

export const bulkDeleteCustomers = async (req, res, next) => {
    
    console.log("Request body:", req.body);
       const { ids } = req.body;
       console.log("IDs to delete (backend):", ids); // Log IDs in backend
   
       if (!Array.isArray(ids) || ids.length === 0) {
           console.log("No Customers IDs provided");
           return res.status(400).json({ success: false, message: "No attribute IDs provided" });
       }
   
       try {
           const result = await Customer.deleteMany({ _id: { $in: ids } });
           console.log("Deletion result:", result);
           if (result.deletedCount === 0) {
               console.log("No Customers were deleted");
               return res.status(404).json({ success: false, message: "No attribute were deleted" });
           }
   
           console.log("Customers deleted successfully");
           return res.status(200).json({
               success: true,
               message: "Customers deleted successfully",
               data: result
           });
       } catch (err) {
           console.error("Error during bulk delete:", err);
           return res.status(500).json({ success: false, message: err.message });
       }
   };
