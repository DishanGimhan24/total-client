import Tag from '../models/Tag.js';

//create a new tag
export const createTag = async (req, res) => {
   //  Check if user is admin, super-admin, or editor
    if (!["super-admin", "admin", "editor"].includes(req.user.role)) {
        return res.status(403).json({ success: false, message: 'You are not authorized' });
}

    // Validate that the name field is present
    if (!req.body.name) {
        return res.status(400).json({ success: false, message: 'Tag name is required' });
    }

    // Check if tag already exists
    try {
        const tagExist = await Tag.findOne({ name: req.body.name });
        if (tagExist) {
            return res.status(400).json({ success: false, message: 'Tag already exists' });
        }

        // Create new tag
        const newTag = new Tag(req.body);
        await newTag.save();
        return res.status(201).json({ success: true, message: 'Tag created successfully', data: newTag });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


//edit tag
export const editTag = async (req, res) => {
    // Check if user is admin, superadmin, or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
       return res.status(403).json({ success: false, message: 'You are not authorized' });
   }

    try {
        const tagId = req.params.id;
        const { name } = req.body;

        // Find the tag by ID
        const tag = await Tag.findById(tagId);
        if (!tag) {
            return res.status(404).json({ success: false, message: 'Tag not found' });
        }

        // Update the tag
        const updatedTag = await Tag.findByIdAndUpdate(tagId, { name }, { new: true });
        if (!updatedTag) {
            return res.status(500).json({ success: false, message: 'Tag not updated' });
        }

        return res.status(200).json({ success: true, message: 'Tag updated successfully', data: updatedTag });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



//delete tag
export const deleteTag = async (req, res) => {
    //check if user is admin, superadmin or editor
 //   if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
 //       return res.status(200).json({ success: false, message: 'You are not authorized' });
 //   };

    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            return res.status(200).json({ success: false, message: 'Tag not found' });
        };

        const deletedTag = await Tag.findByIdAndDelete(req.params.id);
        if (!deletedTag) {
            return res.status(200).json({ success: false, message: 'Tag not deleted' });
        }else{
            return res.status(200).json({ success: true, message: 'Tag deleted successfully' });
        };
    }catch(error){
        return res.status(200).json({ success: false, message: error.message });
    };
};

///get tags
export const getTags = async (req, res) => {
    //check if user is admin, superadmin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({ success: false, message: 'You are not authorized' });
    };

    try {
        const tags = await Tag.find();
        if (!tags) {
            return res.status(200).json({ success: false, message: 'Tags not found' });
        }else{
            return res.status(200).json({ success: true, message: 'Tags fetched successfully', data: tags });
        };
    }catch(error){
        return res.status(200).json({ success: false, message: error.message });
    }
};

//get tag
export const getTag = async (req, res) => {
    //check if user is admin, superadmin or editor
    if (req.user.role !== "super-admin" && req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(200).json({ success: false, message: 'You are not authorized' });
    };

    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            return res.status(200).json({ success: false, message: 'Tag not found' });
        }else{
            return res.status(200).json({ success: true, message: 'Tag fetched successfully', data: tag });
        };
    }catch(error){
        return res.status(200).json({ success: false, message: error.message });
    }
};

export const bulkDeletetags = async (req, res, next) => {
    
    console.log("Request body:", req.body);
       const { ids } = req.body;
       console.log("IDs to delete (backend):", ids); // Log IDs in backend
   
       if (!Array.isArray(ids) || ids.length === 0) {
           console.log("No tag IDs provided");
           return res.status(400).json({ success: false, message: "No tag IDs provided" });
       }
   
       try {
           const result = await Tag.deleteMany({ _id: { $in: ids } });
           console.log("Deletion result:", result);
           if (result.deletedCount === 0) {
               console.log("No Tags were deleted");
               return res.status(404).json({ success: false, message: "No Tags were deleted" });
           }
   
           console.log("Tags deleted successfully");
           return res.status(200).json({
               success: true,
               message: "Tags deleted successfully",
               data: result
           });
       } catch (err) {
           console.error("Error during bulk delete:", err);
           return res.status(500).json({ success: false, message: err.message });
       }
   };