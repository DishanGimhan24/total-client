import express from 'express';
import {verifyToken} from './verifyToken.js';
import { createAttribute, editAttribute, deleteAttribute, getAttribute, getAttributes,bulkDeleteAttributes} from '../controllers/attribute.js';

const router = express.Router();

// Create a new attribute
router.post('/new', verifyToken, createAttribute);

// Edit an attribute
router.put('/edit/:id', verifyToken, editAttribute);

// Delete an attribute
router.delete('/delete/:id', verifyToken, deleteAttribute);

// Get an attribute
router.get('/find/:id', verifyToken, getAttribute);

// Get all attributes
router.get('/all', verifyToken, getAttributes);

router.delete("/bulkdelete",verifyToken,bulkDeleteAttributes );

export default router;