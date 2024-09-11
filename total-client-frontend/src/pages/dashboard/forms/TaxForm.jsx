import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/UserNavbar";
import Alert from "../../../components/Alert";

const TaxForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ message: "", type: "" });
  const [tax, setTax] = useState({ name: "", rate: "", status: "published" });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchTax = async () => {
        try {
          const res = await axios.get(`/tax/find/${id}`);
          if (res.data.success) {
            setTax(res.data.data);
          } else {
            setAlert({ message: res.data.message, type: "danger" });
          }
        } catch (err) {
          setAlert({ message: "Error fetching tax data", type: "danger" });
        }
      };
      fetchTax();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTax((prevTax) => ({ ...prevTax, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taxData = {
      name: tax.name,
      rate: tax.rate,
      status: tax.status,
    };

    try {
      let res;
      if (isEditMode) {
        res = await axios.put(`/tax/edit/${id}`, taxData);
      } else {
        res = await axios.post("/tax/new", taxData);
      }

      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setTimeout(() => navigate("/dashboard/tax"), 2000);
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (err) {
      setAlert({ message: `Error ${isEditMode ? 'updating' : 'creating'} tax`, type: "danger" });
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
            <div className="col-md-8 col-lg-6">
              <div className="card p-4">
                {alert.message && <Alert message={alert.message} type={alert.type} />}
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={tax.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="rate">Tax Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      id="rate"
                      name="rate"
                      value={tax.rate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="status">Status</label>
                    <select
                      className="form-control"
                      id="status"
                      name="status"
                      value={tax.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="published">Published</option>
                      <option value="unpublished">Unpublished</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    {isEditMode ? "Update" : "Add"} Tax
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

export default TaxForm;
