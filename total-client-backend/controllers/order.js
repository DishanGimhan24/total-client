import Order from "../models/Order.js";

//add new order
export const newOrder = async (req, res) => {
  try {
    if (
      req.user.role !== "super-admin" &&
      req.user.role !== "admin" &&
      req.user.role !== "editor"
    ) {
      return res
        .status(200)
        .json({
          success: false,
          message: "You don't have access to create a new Order",
        });
    }

    const order = new Order(req.body);
    if (order) {
      await order.save();
      return res
        .status(200)
        .json({
          success: true,
          message: "Order created successfully",
          data: order,
        });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Order not created" });
    }
  } catch (err) {
    return res.status(200).json({ success: false, message: err.message });
  }
};

//edit order
export const editOrder = async (req, res) => {
  try {
    if (
      req.user.role !== "super-admin" &&
      req.user.role !== "admin" &&
      req.user.role !== "editor"
    ) {
      return res
        .status(200)
        .json({
          success: false,
          message: "You don't have access to edit a Order",
        });
    }

    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (order) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Order updated successfully",
          data: order,
        });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Order not updated" });
    }
  } catch (err) {
    return res.status(200).json({ success: false, message: err.message });
  }
};

//delete order
export const deleteOrder = async (req, res) => {
  try {
    if (
      req.user.role !== "super-admin" &&
      req.user.role !== "admin" &&
      req.user.role !== "editor"
    ) {
      return res
        .status(200)
        .json({
          success: false,
          message: "You don't have access to delete a Order",
        });
    }

    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Order deleted successfully",
          data: order,
        });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Order not deleted" });
    }
  } catch (err) {
    return res.status(200).json({ success: false, message: err.message });
  }
};

//get order
export const getOrder = async (req, res) => {
  try {
    if (
      req.user.role !== "super-admin" &&
      req.user.role !== "admin" &&
      req.user.role !== "editor"
    ) {
      return res
        .status(200)
        .json({
          success: false,
          message: "You don't have access to get a Order",
        });
    }

    const order = await Order.findById(req.params.id);
    if (order) {
      return res
        .status(200)
        .json({ success: true, message: "Order found", data: order });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Order not found" });
    }
  } catch (err) {
    return res.status(200).json({ success: false, message: err.message });
  }
};

//get all orders
export const getOrders = async (req, res) => {
  try {
    if (
      req.user.role !== "super-admin" &&
      req.user.role !== "admin" &&
      req.user.role !== "editor"
    ) {
      return res
        .status(200)
        .json({
          success: false,
          message: "You don't have access to get all Orders",
        });
    }

    const orders = await Order.find();
    if (orders) {
      return res
        .status(200)
        .json({ success: true, message: "Orders found", data: orders });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Orders not found" });
    }
  } catch (err) {
    return res.status(200).json({ success: false, message: err.message });
  }
};

//bulk delete
export const bulkDeleteOrders = async (req, res, next) => {
    
  console.log("Request body:", req.body);
     const { ids } = req.body;
     console.log("IDs to delete (backend):", ids); // Log IDs in backend
 
     if (!Array.isArray(ids) || ids.length === 0) {
         console.log("No Orders IDs provided");
         return res.status(400).json({ success: false, message: "No Order IDs provided" });
     }
 
     try {
         const result = await Order.deleteMany({ _id: { $in: ids } });
         console.log("Deletion result:", result);
         if (result.deletedCount === 0) {
             console.log("No Orders were deleted");
             return res.status(404).json({ success: false, message: "No ordrer were deleted" });
         }
 
         console.log("Orders deleted successfully");
         return res.status(200).json({
             success: true,
             message: "Orders deleted successfully",
             data: result
         });
     } catch (err) {
         console.error("Error during bulk delete:", err);
         return res.status(500).json({ success: false, message: err.message });
     }
 };