import Product from '../models/Product.js';
import {getMediaUrl} from "../helpers/url-generate.js";

//create product
export const createProduct = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor"){
        return res.status(200).json({success: false, message: "You don't have access to create a new Product"});
    }

    const checkProduct = await Product.findOne({name: req.body.name});
    if(checkProduct){
        return res.status(200).json({success: false, message: "Product name already exists"});
    }

    try{
        req.body.img = req.files.img[0].path;
        req.body.gallery = req.files.gallery.map(file => file.path);
        const product = new Product(req.body);
        if(product){
            await product.save();
            return res.status(200).json({
                success: true,
                message: "Product created successfully",
                data: product
            });
        }else{
            return res.status(200).json({success: false, message: "Product not created"});
        }
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }

};

//update product
export const editProduct = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to update this"});
    }

    try{
        const product = await Product.findByIdAndUpdate(req.body);
        if(!product){
            return res.status(200).json({success: false, message: "Product not found"});
        }
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

//delete product
export const deleteProduct = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to delete this"});
    }

    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(200).json({success: false, message: "Product not found"});
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        });
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

//get products
export const getProducts = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access to view this"});
    }
    try{
        const products = await Product.find();
        if(!products){
            return res.status(200).json({success: false, message: "Products not found"});
        }
        products.forEach(product => {
            product.img = getMediaUrl(product.img);
            product.gallery = product.gallery.map(image => getMediaUrl(image));
        });
        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products
        });
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};

//get a product
export const getProduct = async (req, res, next) => {
    // Check if the user is super-admin or admin or editor
    if(req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({success: false, message: "You don't have access"});
    }

    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(200).json({success: false, message: "Product not found"});
        }
        product.img = getMediaUrl(product.img);
        product.gallery = product.gallery.map(image => getMediaUrl(image));
        return res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product
        });
    }catch(err){
        return res.status(200).json({success: false, message: err.message});
    }
};