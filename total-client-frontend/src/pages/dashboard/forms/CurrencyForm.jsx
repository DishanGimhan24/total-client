import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../../../components/Alert";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/UserNavbar";
import { useParams, useNavigate } from "react-router-dom";
import Currency from "../Currency";

const CurrencyForm = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [currency,setCurrency] = useState({
    name: "",
    symbol: "",
    rate: "",
  });
  const { id } = useParams(); // Get the coupon ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);

      // Function to fetch the coupon data
      const fetchCoupon = async () => {
        try {
          const res = await axios.get(`/currency/find/${id}`);
          if (res.data.success) {
            setCurrency(res.data.data); // Correctly set the coupon data
          } else {
            setAlert({ message: res.data.message, type: "danger" });
          }
        } catch (err) {
          setAlert({ message: "Error fetching coupon data", type: "danger" });
        }
      };

      fetchCoupon(); // Call the function to fetch coupon data
    }
  }, [id]); // Only run this effect when 'id' changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrency((prevCurrency) => ({ ...prevCurrency, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (isEditMode) {
        res = await axios.put(`/currency/edit/${id}`, currency);
      } else {
        res = await axios.post("/currency/new",currency);
      }

      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setTimeout(() => navigate("/dashboard/currency"), 2000);
      } else {
        setAlert({ message: res.data.message, type: "danger" });
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

  return (
    <div className="container-fluid">
      <div className="row content">
        <div className="col-sm-3 sidenav vh-100">
          <Sidebar />
        </div>

        <div className="col-sm-9">
          <Navbar />
          <div className="d-flex justify-content-start ms-3">
            {" "}
            {/* Centering the card */}
            <div className="card col-md-8 col-lg-6 p-4">
              {alert.message && (
                <Alert type={alert.type} message={alert.message} />
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={currency.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="symbol">Symbol</label>
                  <input
                    type="text"
                    className="form-control"
                    id="symbol"
                    name="symbol"
                    value={currency.symbol}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rate">Rate</label> {/* Corrected htmlFor */}
                  <input
                    type="number"
                    className="form-control"
                    id="rate"
                    name="rate"
                    value={currency.rate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  {isEditMode ? "Update" : "Create"} Coupon
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyForm;
