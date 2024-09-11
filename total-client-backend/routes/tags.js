import express from 'express';
import { verifyToken } from "./verifyToken.js";
import { createTag, editTag, deleteTag, getTags, getTag ,bulkDeletetags } from '../controllers/tag.js';

const Router = express.Router();

//new tag
Router.post('/new',verifyToken,createTag);

//edit tag
Router.put('/edit/:id',verifyToken,editTag);

//delete tag
Router.delete('/delete/:id', verifyToken, deleteTag);

//get all tags
Router.get('/all', verifyToken, getTags);

//get tag by id
Router.get('/find/:id', verifyToken, getTag);

//delete all brand
Router.delete("/bulkdelete",verifyToken, bulkDeletetags );

export default Router;