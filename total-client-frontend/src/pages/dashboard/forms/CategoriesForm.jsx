import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/UserNavbar";
import Alert from "../../../components/Alert";

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ message: "", type: "" });

  const [category, setCategory] = useState({
    name: "",
    description: "",
    parentId: "",
    status: "published",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchCategory = async () => {
        try {
          const res = await axios.get(`/category/find/${id}`);
          if (res.data.success) {
            setCategory(res.data.data);
          } else {
            setAlert({ message: res.data.message, type: "danger" });
          }
        } catch (err) {
          setAlert({ message: "Error fetching category data", type: "danger" });
        }
      };
      fetchCategory();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (isEditMode) {
        res = await axios.put(`/category/edit/${id}`, category);
      } else {
        res = await axios.post("/category/new", category);
      }

      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setTimeout(() => navigate("/dashboard/categories"), 2000);
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (err) {
      setAlert({
        message: `Error ${isEditMode ? "updating" : "creating"} category`,
        type: "danger",
      });
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
            <div className="col row">
              <div className="justify-content-between mb-3">
                <Navbar />
              </div>
            </div>
          </div>

          <div className="row justify-content-start">
            <div className="card col-md-8 col-lg-6 ml-4 p-4">
              {alert.message && (
                <Alert message={alert.message} type={alert.type} />
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="parentId">Parent ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="parentId"
                    name="parentId"
                    value={category.parentId}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={category.status}
                    onChange={handleChange}
                  >
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  {isEditMode ? "Update" : "Add"} Category
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
