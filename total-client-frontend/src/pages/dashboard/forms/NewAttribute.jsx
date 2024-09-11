import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../../../components/Alert";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/UserNavbar";
import { useParams, useNavigate } from "react-router-dom";

const NewAttribute = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [status, setStatus] = useState("published");
  const [values, setValues] = useState([]);
  const [name, setName] = useState("");
  const { id } = useParams();  // Get the attribute ID from the URL
  const navigate = useNavigate();  // Hook for navigation
  const [isEditMode, setIsEditMode] = useState(false);
  const [attribute, setAttribute] = useState({ name: "", status: "published", values: [] });

  useEffect(() => {
    if (id) {
      setIsEditMode(true);

      // Function to fetch the attribute data
      const fetchAttribute = async () => {
        try {
          const res = await axios.get(`/attribute/find/${id}`);
          if (res.data.success) {
            setAttribute(res.data.data);  // Correctly set the attribute data
            setName(res.data.data.name);
            setStatus(res.data.data.status);
            setValues(res.data.data.values);
          } else {
            setAlert({ message: res.data.message, type: "danger" });
          }
        } catch (err) {
          setAlert({ message: "Error fetching attribute data", type: "danger" });
        }
      };

      fetchAttribute();  // Call the function to fetch attribute data
    }
  }, [id]);  // Only run this effect when 'id' changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    const attribute = {
      name,
      status,
      values,
    };

    try {
      if (isEditMode) {  // Check if it's in edit mode
        const res = await axios.put(`/attribute/edit/${id}`, attribute);
        if (res.data.success) {
          setAlert({ message: res.data.message, type: "success" });
          setTimeout(() => navigate("/dashboard/attributes"),0);
        } else {
          setAlert({ message: res.data.message, type: "danger" });
        }
      } else {
        const res = await axios.post("/attribute/new", attribute);
        if (res.data.success) {
          setAlert({ message: res.data.message, type: "success" });
          setTimeout(() => navigate("/dashboard/attributes"),0);
          setName("");
          setValues([]);
        } else {
          setAlert({ message: res.data.message, type: "danger" });
        }
      }
    } catch (error) {
      if (error.response) {
        setAlert({
          message: `Server Error: ${error.response.data.message}`,
          type: "danger",
        });
      } else if (error.request) {
        setAlert({
          message:
            "No response received from the server. Please try again later.",
          type: "danger",
        });
      } else {
        setAlert({ message: `Error: ${error.message}`, type: "danger" });
      }
      console.error(error);
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
          <Navbar />
          <div className="d-flex justify-content-start ms-3"> {/* Centering the card */}
            <div className="card col-md-8 col-lg-6 p-4">
              {alert.message && (
                <Alert type={alert.type} message={alert.message} />
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Attribute Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select className="form-control" id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="values" className="form-label">Values</label>
                  <input
                    type="text"
                    className="form-control"
                    id="values"
                    value={values.join(", ")}  // Join array to string for display
                    onChange={(e) => setValues(e.target.value.split(",").map(value => value.trim()))}  // Split and trim input to handle array
                  />
                  <div id="valuesHelp" className="form-text">
                    Comma-separated values
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  {isEditMode ? 'Update' : 'Create'} Attribute
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAttribute;
