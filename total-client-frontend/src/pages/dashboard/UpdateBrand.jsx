import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/UserNavbar";
import Alert from "../../components/Alert";

const UpdateBrand = () => {
    const { id } = useParams();
    const [brand, setBrand] = useState({ name: "", img: "", status: "" });
    const [alert, setAlert] = useState({ message: "", type: "" });
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const res = await axios.get(`/brand/find/${id}`);
                if (res.data.success) {
                    setBrand(res.data.data);
                } else {
                    setAlert({ message: res.data.message, type: "danger" });
                }
            } catch (err) {
                setAlert({ message: "Error fetching brand data", type: "danger" });
            }
        };
        fetchBrand();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrand((prevBrand) => ({ ...prevBrand, [name]: value }));
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
            const res = await axios.put(`/brand/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.success) {
                setAlert({ message: res.data.message, type: "success" });
                setTimeout(() => navigate("/dashboard/brands"), 2000);
            } else {
                setAlert({ message: res.data.message, type: "danger" });
            }
        } catch (err) {
            setAlert({ message: "Error updating brand", type: "danger" });
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
                    <div className="col-sm-9">
                        <div className="card-body col-9">
                            {alert.message && (
                                <Alert message={alert.message} type={alert.type} />
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={brand.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="img">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="img"
                                        name="img"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        className="form-control"
                                        id="status"
                                        name="status"
                                        value={brand.status}
                                        onChange={handleChange}
                                    >
                                        <option value="published">Published</option>
                                        <option value="unpublished">Unpublished</option>
                                        <option value="unpublished">Private</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Update Brand</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBrand;
