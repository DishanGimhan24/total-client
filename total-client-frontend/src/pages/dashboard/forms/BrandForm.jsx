import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/UserNavbar";
import Alert from "../../../components/Alert";
import Select from "react-select";

const BrandForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ message: "", type: "" });
  const [brand, setBrand] = useState({ name: "", status: "published", img: "" });
  const [status, setStatus] = useState({ value: "published", label: "Published" });
  const [imageFile, setImageFile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchBrand = async () => {
        try {
          const res = await axios.get(`/brand/find/${id}`);
          if (res.data.success) {
            setBrand(res.data.data);
            setStatus({ value: res.data.data.status, label: capitalize(res.data.data.status) });
          } else {
            setAlert({ message: res.data.message, type: "danger" });
          }
        } catch (err) {
          setAlert({ message: "Error fetching brand data", type: "danger" });
        }
      };
      fetchBrand();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand((prevBrand) => ({ ...prevBrand, [name]: value }));
  };

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption);
    setBrand((prevBrand) => ({ ...prevBrand, status: selectedOption.value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", brand.name);
    formData.append("status", brand.status);
    if (imageFile) {
      formData.append("img", imageFile);
    }

    try {
      let res;
      if (isEditMode) {
        res = await axios.put(`/brand/update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axios.post('/brand/new', formData);
      }

      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setTimeout(() => navigate("/dashboard/brands"), 2000);
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (err) {
      setAlert({ message: `Error ${isEditMode ? 'updating' : 'creating'} brand`, type: "danger" });
    }
  };

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div className="container-fluid">
      <div className="row content">
        <div className="col-sm-3 sidenav vh-100">
          <Sidebar />
        </div>

        <div className="col-sm-9">
          <div className="row">
            <div className="col row">
              <div className="justify-content-between mb-3">
                <Navbar />
              </div>
            </div>
          </div>

          <div className="row justify-content-start">
            <div className="card col-md-8 col-lg-6 ml-3 p-4">
              {alert.message && (
                <Alert message={alert.message} type={alert.type} />
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Brand Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={brand.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="img">Brand Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="img"
                    name="img"
                    onChange={handleImageChange}
                    required={!isEditMode}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="brandStatus">Brand Status</label>
                  <Select
                    id="brandStatus"
                    value={status}
                    onChange={handleStatusChange}
                    options={[
                      { value: "published", label: "Published" },
                      { value: "unpublished", label: "Unpublished" }
                    ]}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">{isEditMode ? 'Update' : 'Add'} Brand</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandForm;
