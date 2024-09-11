import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/UserNavbar";
import axios from "axios";
import Alert from "../../components/Alert";
import Select from "react-select";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("published");
  const [parentCategory, setParentCategory] = useState("0");
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      Header: "",
      accessor: "select",
      Cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.original)}
          onChange={() => handleRowSelect(row.original)}
        />
      ),
    },
    { Header: "Name", accessor: "name" },
    { Header: "Parent Category", accessor: "parentId" },
    { Header: "Description", accessor: "description" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div>
          <IconButton aria-label="edit" onClick={() => handleEdit(row.original)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(row.original)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  // Status options for the select input
  const options = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "private", label: "Private" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/category/all');
        if (res.data.success) {
          const categories = res.data.data.map((category) => ({
            id: category._id,
            name: category.name,
            parentId: category.parentId || "None",
            description: category.description || "N/A",
            status: category.status,
          }));
          setData(categories);
        } else {
          setAlert({ message: res.data.message, type: "danger" });
        }
      } catch (err) {
        setAlert({ message: "Error fetching categories", type: "danger" });
      }
    };
    fetchData();
  }, []);

  const handleCreateNew = () => {
    navigate('/dashboard/categories/add');
  };

  const handleRowSelect = (row) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(row)
        ? prevSelectedRows.filter((r) => r !== row)
        : [...prevSelectedRows, row]
    );
  };

  const handleEdit = (row) => {
    const { id } = row;
    if (id) {
      navigate(`/dashboard/categories/edit/${id}`);
    } else {
      console.error("Category ID is missing");
    }
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.delete(`/category/delete/${row.id}`);
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setData(data.filter((category) => category.id !== row.id));
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "Error deleting category", type: "danger" });
    }
  };

  const handleBulkDelete = async () => {
    const idsToDelete = selectedRows.map(row => row.id);
    try {
      const res = await axios.delete(`/category/bulkdelete`, { data: { ids: idsToDelete } });
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setData(data.filter((category) => !idsToDelete.includes(category.id)));
        setSelectedRows([]); // Clear selected rows after deletion
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      console.error("Error deleting categories", error);
      setAlert({ message: "Error deleting categories", type: "danger" });
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

          <div className="btn-container">
            <button id="add-category-btn" type="button" className="btn btn-lg btn-primary" onClick={handleCreateNew}>Add Category</button>
            <button type="button" className="btn btn-outline-danger" onClick={handleBulkDelete}>Bulk Delete</button>
          </div>

          <div className="col-sm-9">
            <div className="card-body col-9">
              {alert.message && (
                <Alert message={alert.message} type={alert.type} />
              )}
              {data.length > 0 && (
                <Table columns={columns} data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
