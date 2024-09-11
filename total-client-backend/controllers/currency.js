import Currency from '../models/Currency.js';

//add new currency
export const newCurrency = async (req, res) => {

    try{
        if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
            return res.status(200).json({ success: false, message: "You don't have access to create a new Currency" });
        }

        const currency = new Currency(req.body);
        if (currency) {
            await currency.save();
            return res.status(200).json({ success: true, message: "Currency created successfully", data: currency });
        } else {
            return res.status(200).json({ success: false, message: "Currency not created" });
        }
    }catch(err){
        return res.status(200).json({ success: false, message: err.message });
    }

}

//edit currency
export const editCurrency = async (req, res) => {

    try{
        if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
            return res.status(200).json({ success: false, message: "You don't have access to edit a Currency" });
        }

        const currency = await Currency.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (currency) {
            return res.status(200).json({ success: true, message: "Currency updated successfully", data: currency });
        } else {
            return res.status(200).json({ success: false, message: "Currency not updated" });
        }
    }catch(err){
        return res.status(200).json({ success: false, message: err.message });
    }

}

//delete currency
export const deleteCurrency = async (req, res) => {

    try{
        if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
            return res.status(200).json({ success: false, message: "You don't have access to delete a Currency" });
        }

        const currency = await Currency.findByIdAndDelete(req.params.id);
        if (currency) {
            return res.status(200).json({ success: true, message: "Currency deleted successfully", data: currency });
        } else {
            return res.status(200).json({ success: false, message: "Currency not deleted" });
        }
    }catch(err){
        return res.status(200).json({ success: false, message: err.message });
    }

}

//get currency
export const getCurrency = async (req, res) => {

    try{
        const currency = await Currency.findById(req.params.id);
        if (currency) {
            return res.status(200).json({ success: true, message: "Currency found", data: currency });
        } else {
            return res.status(200).json({ success: false, message: "Currency not found" });
        }
    }catch(err){
        return res.status(200).json({ success: false, message: err.message });
    }

}

//get all currencies
export const getCurrencies = async (req, res) => {

    try{
        const currencies = await Currency.find();
        if (currencies) {
            return res.status(200).json({ success: true, message: "Currencies found", data: currencies });
        } else {
            return res.status(200).json({ success: false, message: "Currencies not found" });
        }
    }catch(err){
        return res.status(200).json({ success: false, message: err.message });
    }

}

export const bulkDeleteCurrency = async (req, res, next) => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        console.log("No coupon IDs provided");
        return res.status(400).json({ success: false, message: "No brand IDs provided" });
    }

    try {
        const result = await Currency.deleteMany({ _id: { $in: ids } });
        console.log("Deletion result:", result);
        if (result.deletedCount === 0) {
            console.log("No coupon were deleted");
            return res.status(404).json({ success: false, message: "No brands were deleted" });
        }
        return res.status(200).json({
            success: true,
            message: "coupon deleted successfully",
            data: result
        });
    } catch (err) {
        console.error("Error during bulk delete:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};