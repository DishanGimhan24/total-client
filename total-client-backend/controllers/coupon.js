import Coupon from "../models/Coupon.js"

//add new coupon
export const newCoupon = async (req, res) => {

    try{
        if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
            return res.status(200).json({ success: false, message: "You don't have access to create a new Coupon" });
        }

        const coupon = new Coupon(req.body);
        if (coupon) {
            await coupon.save();
            return res.status(200).json({ success: true, message: "Coupon created successfully", data: coupon });
        } else {
            return res.status(200).json({ success: false, message: "Coupon not created" });
        }
    }catch(err){
        return res.status(200).json({ success: false, message: err.message });
    }

}

//edit coupon
export const editCoupon = async (req, res) => {

    try{
        if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
            return res.status(200).json({ success: false, message: "You don't have access to edit a Coupon" });
        }

        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (coupon) {
            return res.status(200).json({ success: true, message: "Coupon updated successfully", data: coupon });
        } else {
            return res.status(200).json({ success: false, message: "Coupon not updated" });
        }
    }catch(err){
        return res.status(200).json({ success: false, message: err.message });
    }

}

//delete coupon
export const deleteCoupon = async (req, res) => {

    try{
        if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
            return res.status(200).json({ success: false, message: "You don't have access to delete a Coupon" });
        }

        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (coupon) {
            return res.status(200).json({ success: true, message: "Coupon deleted successfully", data: coupon });
        } else {
            return res.status(200).json({ success: false, message: "Coupon not deleted" });
        }
    }catch(err){
        return res.status(200).json({ success: false, message: err.message });
    }

}

//get all coupons
export const getCoupons = async (req, res) => {

    try{

        //check access
        if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
            return res.status(200).json({ success: false, message: "You don't have access to view Coupons" });
        }

        const coupons = await Coupon.find();
        return res.status(200).json({ success: true, data: coupons });
    }catch(err){
        return res.status(200).json({ success: false, message: err.message });
    }

}

//get single coupon
export const getCoupon = async (req, res) => {

    try{

        //check access
        if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
            return res.status(200).json({ success: false, message: "You don't have access to view a Coupon" });
        }

        const coupon = await Coupon.findById(req.params.id);
        return res.status(200).json({ success: true, data: coupon });
    }catch(err){
        return res.status(200).json({ success: false, message: err.message });
    }

}

export const bulkDeleteCoupons = async (req, res, next) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        console.log("No coupon IDs provided");
        return res.status(400).json({ success: false, message: "No coupon IDs provided" });
    }

    try {
        const result = await Coupon.deleteMany({ _id: { $in: ids } });
        console.log("Deletion result:", result);
        if (result.deletedCount === 0) {
            console.log("No coupons were deleted");
            return res.status(404).json({ success: false, message: "No coupons were deleted" });
        }
        return res.status(200).json({
            success: true,
            message: "Coupons deleted successfully",
            data: result
        });
    } catch (err) {
        console.error("Error during bulk delete:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};
