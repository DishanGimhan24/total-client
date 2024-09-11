import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/UserNavbar";
import Alert from "../../../components/Alert";

const VendorForm = () => {
  const { id } = useParams(); // Get vendor ID from URL parameters
  const navigate = useNavigate();
  const [vendor, setVendor] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch vendor data if ID is present (edit mode)
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchVendor = async () => {
        try {
          const res = await axios.get(`/vendor/find/${id}`);
          if (res.data.success) {
            setVendor(res.data.data);
          } else {
            setAlert({ message: res.data.message, type: 'danger' });
          }
        } catch (error) {
          setAlert({ message: 'Error fetching vendor data.', type: 'danger' });
        }
      };
      fetchVendor();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEditMode) {
        // Update existing vendor
        res = await axios.put(`/vendor/update/${id}`, vendor);
      } else {
        // Add new vendor
        res = await axios.post('/vendor/new', vendor);
      }
      if (res.data.success) {
        setAlert({ message: res.data.message, type: 'success' });
        setVendor({ name: '', email: '', phone: '', address: '' }); // Reset form fields
        setTimeout(() => navigate('/dashboard/vendors'), 2000); // Redirect after delay
      } else {
        setAlert({ message: res.data.message, type: 'danger' });
      }
    } catch (error) {
      setAlert({ message: 'An error occurred. Please try again.', type: 'danger' });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row content">
        <div className="col-sm-3 sidenav vh-100">
          <Sidebar />
        </div>

        <div className="col-sm-9">
          <div className="row">
            <div className="col">
              <Navbar />
            </div>
          </div>

          <div className="d-flex justify-content-start ms-3">
            <div className="col-md-8">
              <div className="card p-4">
                {alert.message && (
                  <Alert message={alert.message} type={alert.type} />
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="name">Vendor Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={vendor.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={vendor.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={vendor.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={vendor.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    {isEditMode ? 'Update Vendor' : 'Add Vendor'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorForm;
