import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/UserNavbar";
import Alert from "../../../components/Alert";

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "" });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchCustomer = async () => {
        try {
          const res = await axios.get(`/customer/find/${id}`);
          if (res.data.success) {
            setCustomer(res.data.data);
          } else {
            setAlert({ message: res.data.message, type: "danger" });
          }
        } catch (err) {
          setAlert({ message: "Error fetching customer data", type: "danger" });
        }
      };
      fetchCustomer();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEditMode) {
        res = await axios.put(`/customer/update/${id}`, customer);
      } else {
        res = await axios.post('/customer/new', customer);
      }

      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setTimeout(() => navigate("/dashboard/customers"), 2000);
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      setAlert({ message: `Error ${isEditMode ? 'updating' : 'creating'} customer`, type: "danger" });
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
          <div className="d-flex justify-content-start ms-3"> {/* Added ms-5 for left margin */}
            <div className="card col-md-8 col-lg-6 p-4">
              {alert.message && <Alert message={alert.message} type={alert.type} />}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Customer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={customer.address}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  {isEditMode ? 'Update' : 'Add'} Customer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
