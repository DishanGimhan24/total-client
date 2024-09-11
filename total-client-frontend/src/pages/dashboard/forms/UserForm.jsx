import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/UserNavbar";
import Alert from "../../../components/Alert";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    DOB: "",
    status: true,
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchUser = async () => {
        try {
          const res = await axios.get(`/user/find/${id}`);
          if (res.data.success) {
            setUser(res.data.data);
          } else {
            setAlert({ message: res.data.message, type: "danger" });
          }
        } catch (err) {
          setAlert({ message: "Error fetching user data", type: "danger" });
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "status" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEditMode) {
        res = await axios.put(`/user/update/${id}`, user);
      } else {
        res = await axios.post("/user/new", user);
      }

      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setTimeout(() => navigate("/dashboard/users"), 2000);
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      setAlert({ message: `Error ${isEditMode ? "updating" : "creating"} user`, type: "danger" });
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
                      value={user.name}
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
                      value={user.email}
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
                      value={user.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="dob">DOB</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="DOB"
                      value={user.DOB}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="status">Status</label>
                    <select
                      className="form-control"
                      id="status"
                      name="status"
                      value={user.status ? "true" : "false"}
                      onChange={handleChange}
                      required
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    {isEditMode ? "Update" : "Add"} User
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

export default UserForm;
