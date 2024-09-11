import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/UserNavbar";
import Alert from "../../../components/Alert";

const TagForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ message: "", type: "" });
  const [tag, setTag] = useState({ name: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchTag = async () => {
        try {
          const res = await axios.get(`/tag/find/${id}`);
          if (res.data.success) {
            setTag(res.data.data);
          } else {
            setAlert({ message: res.data.message, type: "danger" });
          }
        } catch (err) {
          setAlert({ message: "Error fetching tag data", type: "danger" });
        }
      };
      fetchTag();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTag((prevTag) => ({ ...prevTag, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagData = {
      name: tag.name,
    };

    try {
      let res;
      if (isEditMode) {
        res = await axios.put(`/tag/edit/${id}`, tagData);
      } else {
        res = await axios.post("/tag/new", tagData);
      }

      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setTimeout(() => navigate("/dashboard/tags"), 2000);
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (err) {
      setAlert({ message: `Error ${isEditMode ? 'updating' : 'creating'} tag`, type: "danger" });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row content">
        <div className="col-sm-3 sidenav vh-100">
          <Sidebar />
        </div>

        <div className="col-sm-9">
          <Navbar />
          <div className="d-flex justify-content-start ms-3">{/* Center the card horizontally */}
            <div className="card col-md-8 col-lg-6 p-4">
              {alert.message && <Alert message={alert.message} type={alert.type} />}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Tag Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={tag.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">
                  {isEditMode ? "Update" : "Add"} Tag
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagForm;
