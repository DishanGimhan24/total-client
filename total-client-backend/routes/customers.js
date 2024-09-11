import express from 'express';
import {verifyToken} from "./verifyToken.js";
import {addCustomer, updateCustomer, deleteCustomer, getCustomer, getCustomers,bulkDeleteCustomers} from '../controllers/customer.js';

const router = express.Router();

//add customer
router.post('/new', addCustomer);

//update customer by id
router.put('/update/:id', updateCustomer);

//delete customer by id
router.delete('/delete/:id', deleteCustomer);

//get customer by id
router.get('/find/:id',  getCustomer);

//get all customers
router.get('/all', getCustomers);

//delete all brand
router.delete("/bulkdelete",verifyToken, bulkDeleteCustomers );

export default router;