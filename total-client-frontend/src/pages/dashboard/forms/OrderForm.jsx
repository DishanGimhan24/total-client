import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Alert from "../../../components/Alert";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/UserNavbar";
import { useParams, useNavigate } from "react-router-dom";
import CustomerContext from "../CustomerContext";
import Select from "react-select";

const OrderForm = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [order, setOrder] = useState({
    products: "",
    customerId: "",
    shippingId: "",
    subTotal: "",
    total: "",
    paymentMethod: "",
    token: "",
    weight: "",
    billingAddress: "",
    shippingAddress: "",
    coupon: "",
    payementId: "", // Ensure this matches schema
    storeId: "",
    status: "pending",
  });
  const { id } = useParams(); // Get the order ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [isEditMode, setIsEditMode] = useState(false);
  const { customers } = useContext(CustomerContext);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);

      // Function to fetch the order data
      const fetchOrder = async () => {
        try {
          const res = await axios.get(`/order/find/${id}`);
          if (res.data.success) {
            setOrder(res.data.data); // Correctly set the order data
          } else {
            setAlert({ message: res.data.message, type: "danger" });
          }
        } catch (err) {
          setAlert({ message: "Error fetching order data", type: "danger" });
        }
      };

      fetchOrder(); // Call the function to fetch order data
    }
  }, [id]); // Only run this effect when 'id' changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };
  const handleSelectChange = (e) => {
    const selectedCustomerId = e.target.value;
    setOrder((prevOrder) => ({ ...prevOrder, customerId: selectedCustomerId }));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

        // Log customerId and paymentId before submission
        console.log("Customer ID:", order.customerId);
        console.log("Payment ID:", order.payementId);

    try {
      let res;
      if (isEditMode) {
        res = await axios.put(`/order/edit/${id}`, order);
      } else {
        res = await axios.post("/order/new", order);
      }

      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setTimeout(() => navigate("/dashboard/orders"), 2000);
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
            <div className="card col-md-8 col-lg-6 p-4">
              {alert.message && (
                <Alert type={alert.type} message={alert.message} />
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="products">Products</label>
                  <input
                    type="text"
                    className="form-control"
                    id="products"
                    name="products"
                    value={order.products}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerId">Customer Name</label>
                  <select
                    className="form-select"
                    id="customerId"
                    name="customerId"
                    value={order.customerId}
                    onChange={handleSelectChange}
                  >
                    <option value="" disabled>
                      Select a customer
                    </option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="shippingId">Shipping ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="shippingId"
                    name="shippingId"
                    value={order.shippingId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subTotal">Subtotal</label>
                  <input
                    type="number"
                    className="form-control"
                    id="subTotal"
                    name="subTotal"
                    value={order.subTotal}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="total">Total</label>
                  <input
                    type="number"
                    className="form-control"
                    id="total"
                    name="total"
                    value={order.total}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="paymentMethod">Payment Method</label>
                  <input
                    type="text"
                    className="form-control"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={order.paymentMethod}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="token">Token</label>
                  <input
                    type="text"
                    className="form-control"
                    id="token"
                    name="token"
                    value={order.token}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="weight">Weight</label>
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    name="weight"
                    value={order.weight}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="billingAddress">Billing Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="billingAddress"
                    name="billingAddress"
                    value={order.billingAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="shippingAddress">Shipping Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="shippingAddress"
                    name="shippingAddress"
                    value={order.shippingAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="coupon">Coupon</label>
                  <input
                    type="text"
                    className="form-control"
                    id="coupon"
                    name="coupon"
                    value={order.coupon}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="paymentId">Payment ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="payementId"
                    name="payementId"
                    value={order.payementId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="storeId">Store ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="storeId"
                    name="storeId"
                    value={order.storeId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Order Status</label>
                  <Select
                    id="status"
                    name="status"
                    value={{ value: order.status, label: order.status }}
                    onChange={(selectedOption) =>
                      setOrder((prevOrder) => ({
                        ...prevOrder,
                        status: selectedOption.value,
                      }))
                    }
                    options={[
                      { value: "pending", label: "Pending" },
                      { value: "completed", label: "Completed" },
                      {
                        value: "waiting for payment",
                        label: "Waiting for Payment",
                      },
                    ]}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  {isEditMode ? "Update Order" : "Create Order"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
