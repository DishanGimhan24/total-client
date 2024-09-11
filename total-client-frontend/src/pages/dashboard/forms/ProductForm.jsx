import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");
  const [sku, setSku] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [warranty, setWarranty] = useState("");
  const [image, setImage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData();
    formData.append("price", price);
    formData.append("salePrice", salePrice);
    formData.append("stock", stock);
    formData.append("sku", sku);
    formData.append("weight", weight);
    formData.append("dimensions", dimensions);
    formData.append("warranty", warranty);
    formData.append("image", image);

    // Example: send data to API
    // axios.post('/api/products', formData)
    //   .then(response => console.log(response.data))
    //   .catch(error => console.error(error));
  };

  const showModal = location.state?.showModal || false;

  const handleClose = () => {
    // Navigate back or to another route without modal state
    navigate('/dashboard/products');
  };


  return (
    <div>
      {/* Other content */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container mt-4">
        <h3 className="mb-4 text-center">Add New Parameters</h3>
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="regularPrice" className="form-label">Regular Price</label>
              <input
                type="number"
                id="regularPrice"
                className="form-control"
                placeholder="1000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="salePrice" className="form-label">Sale Price</label>
              <input
                type="number"
                id="salePrice"
                className="form-control"
                placeholder="800"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="sku" className="form-label">SKU</label>
              <input
                type="text"
                id="sku"
                className="form-control"
                placeholder="SKU123"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="stockQuantity" className="form-label">Stock Quantity</label>
              <input
                type="number"
                id="stockQuantity"
                className="form-control"
                placeholder="100"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="weight" className="form-label">Weight (kg)</label>
              <input
                type="text"
                id="weight"
                className="form-control"
                placeholder="1000"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="dimensions" className="form-label">Dimensions (cm)</label>
              <input
                type="text"
                id="dimensions"
                className="form-control"
                placeholder="100x100x100"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="warranty" className="form-label">Warranty</label>
              <input
                type="text"
                id="warranty"
                className="form-control"
                placeholder="1 year warranty"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Product Image</label>
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Save Product</button>
        </form>
      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {/* Handle save action */}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductForm;
