import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/UserNavbar";
import Select from "react-select";
import DropdownForm from "./DropdownForm";
import DisplayPage from "../DisplayPage";
import SelectedAttributes from "./SelectedAttributes";


const Products = ( ) => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [status, setStatus] = useState("published");
  const [productType, setProductType] = useState("simple");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [filteredValues, setFilteredValues] = useState([]);
  const [values, setValues] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const [formData, setFormData] = useState({});
  

  const [cards, setCards] = useState([{ id: 1, selectedAttribute: '', values: [], isVisible: false }]);

const [showModal, setShowModal] = useState(false);

const handleShowModal = () => setShowModal(true);

  // Define the function to handle hiding the modal
const handleHideModal = () => setShowModal(false);

 const handleTypeChange = (e) => {
    setProductType(e.value);
  };

  const handleChange = (e) => {
    setStatus(e.value);
  };

  const brandChange = (e) => {
    setBrands(e);
  };

  const categoryChange = (e) => {
    setCategories(e);
  };

  const vendorChange = (e) => {
    setVendors(e);
  };

  const tagChange = (e) => {
    setTags(e);
  };

  useEffect(() => {
    const simpleProductElement = document.getElementById("simple-product-data");
    if (productType === "simple") {
      simpleProductElement.style.display = "block";
    } else {
      simpleProductElement.style.display = "none";
    }
  }, [productType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      description: e.target[1].value,
      content: e.target[2].value,
      productType: productType,
      price: e.target[4].value,
      salePrice: e.target[5].value,
      sku: e.target[6].value,
      quantity: e.target[7].value,
      weight: e.target[8].value,
      dimensions: e.target[9].value.split("x"),
      warranty: e.target[10].value,
      brand: brands.value,
      categories: categories,
      vendors: vendors,
      tags: tags,
      img: e.target[11].files[0],
      gallery: e.target[12].files,
      status: status,
    };

    if (data.productType === "simple") {
      createSimpleProduct(data);
    } else {
      const parentId = await createSimpleProduct(data);
      if (parentId) {
        createVariation(data, parentId);
      } else {
        console.log("Error");
      }
    }
  };

  const createSimpleProduct = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("productType", data.productType);
    formData.append("price", data.price);
    formData.append("salePrice", data.salePrice);
    formData.append("sku", data.sku);
    formData.append("quantity", data.quantity);
    formData.append("weight", data.weight);
    formData.append("dimensions", data.dimensions);
    formData.append("warranty", data.warranty);
    formData.append("brand", data.brand);
    for (let i = 0; i < data.categories.length; i++) {
      formData.append("categories", data.categories[i].value);
    }
    for (let i = 0; i < data.vendors.length; i++) {
      formData.append("vendors", data.vendors[i].value);
    }
    for (let i = 0; i < data.tags.length; i++) {
      formData.append("tags", data.tags[i].value);
    }
    formData.append("img", data.img);
    for (let i = 0; i < data.gallery.length; i++) {
      formData.append("gallery", data.gallery[i]);
    }
    formData.append("status", data.status);

    const res = await axios.post("/product/new", formData);
    if (res.data.success) {
      setAlert({ message: res.data.message, type: "success" });
      return res.data.data._id;
    } else {
      setAlert({ message: res.data.message, type: "danger" });
    }
  };

  const createVariation = async (data, id) => {
    // Handle variation creation
  };

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const res = await axios.get("/attribute/all");
        if (res.status === 200 && res.data.success) {
          setAttributes(res.data.data);
        } else {
          console.error("Failed to fetch attributes");
        }
      } catch (error) {
        console.error("Error fetching attributes", error);
      }
    };
    
    fetchAttributes();
  }, []);

  useEffect(() => {
    if (selectedAttribute) {
      const selectedAttr = attributes.find(attr => attr._id === selectedAttribute.value);
      if (selectedAttr) {
        setFilteredValues(selectedAttr.values);
        setValues([selectedAttr.values[0]]); // Default value
      }
    } else {
      setFilteredValues([]);
      setValues([]);
    }
  }, [selectedAttribute, attributes]);


  const handleAttributeChange = (formId, selectedAttribute) => {
    setSelectedData(prevData => ({
      ...prevData,
      [formId]: {
        ...prevData[formId],
        selectedAttribute,
      },
    }));
  };


  const handleValuesChange = (formId, selectedValues) => {
    setSelectedData(prevData => ({
      ...prevData,
      [formId]: {
        ...prevData[formId],
        selectedValues: selectedValues.map(option => option.value),
      },
    }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 bg-light vh-100">
          <Sidebar />
        </div>
        <div className="col-sm-9">
          <Navbar />
         
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row mt-4">
              <div className="col-md-8">
                <div className="card p-3">
                  <h3 className="text-primary">Add New Product</h3>
                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input type="text" id="productName" className="form-control" placeholder="Lenovo Thinkpad" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="shortDescription" className="form-label">Short Description</label>
                    <textarea id="shortDescription" className="form-control" rows="4" placeholder="Short description about the product"></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">Product Description</label>
                    <textarea id="productDescription" className="form-control" rows="8" placeholder="Product description"></textarea>
                  </div>
                  <h4 className="text-primary">Product Data</h4>
                  <div className="mb-3">
                    <label htmlFor="productType" className="form-label">Product Type</label>
                    <Select
                      options={[
                        { value: "simple", label: "Simple" },
                        { value: "variable", label: "Variable" },
                      ]}
                      onChange={handleTypeChange}
                      id="productType"
                    />
                  </div>
                  <div id="simple-product-data" style={{ display: 'block' }}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="regularPrice" className="form-label">Regular Price</label>
                          <input type="number" id="regularPrice" className="form-control" placeholder="1000" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="salePrice" className="form-label">Sale Price</label>
                          <input type="number" id="salePrice" className="form-control" placeholder="800" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="sku" className="form-label">SKU</label>
                          <input type="text" id="sku" className="form-control" placeholder="SKU123" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="stockQuantity" className="form-label">Stock Quantity</label>
                          <input type="number" id="stockQuantity" className="form-control" placeholder="100" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="weight" className="form-label">Weight (kg)</label>
                          <input type="text" id="weight" className="form-control" placeholder="1000" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="dimensions" className="form-label">Dimensions (cm)</label>
                          <input type="text" id="dimensions" className="form-control" placeholder="100x100x100" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="warranty" className="form-label">Warranty</label>
                          <input type="text" id="warranty" className="form-control" placeholder="1 year warranty" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Product Image</label>
                    <input type="file" id="productImage" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productGallery" className="form-label">Product Gallery</label>
                    <input type="file" id="productGallery" className="form-control" multiple />
                  </div>

                <div className="container mt-3"> 
                <DropdownForm
  attributes={attributes}
  onAttributeChange={handleAttributeChange}
  onValuesChange={handleValuesChange}
/>
</div>
<div className="card p-3 mt-5">
  <h3>Variations</h3>
  <DisplayPage selectedData={selectedData} />
 </div>

 </div><div className="card p-3 mt-5">
  <h3>Selected Values</h3>
 <SelectedAttributes/>

              </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
                  <h4 className="text-primary">Additional Information</h4>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <Select
                      options={[
                        { value: "published", label: "Published" },
                        { value: "draft", label: "Draft" },
                      ]}
                      onChange={handleChange}
                      id="status"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="brand" className="form-label">Brand</label>
                    <Select
                      options={[
                        { value: "laptop", label: "Laptop" },
                        { value: "desktop", label: "Desktop" },
                      ]}
                      onChange={brandChange}
                      isMulti
                      id="brand"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="categories" className="form-label">Categories</label>
                    <Select
                      // options={/* Options for categories */}
                      onChange={categoryChange}
                      isMulti
                      id="categories"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="vendors" className="form-label">Vendors</label>
                    <Select
                      options={[
                        { value: "lenovo", label: "Lenovo" },
                        { value: "dell", label: "Dell" },
                      ]}
                      onChange={vendorChange}
                      isMulti
                      id="vendors"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tags</label>
                    <Select
                     options={[
                      { value: "laptop", label: "Laptop" },
                      { value: "desktop", label: "Desktop" },
                    ]}
                      onChange={tagChange}
                      isMulti
                      id="tags"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Product</button>
                </div>
              </div>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Products;
