import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/UserNavbar";
import axios from "axios";
import Alert from "../../components/Alert";
import Table from "../../components/Table";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

// Main component for managing customers
const Customers = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [status, setStatus] = useState("published");
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  // Define columns for the table
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
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Address", accessor: "address" },
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

  // Navigate to the "add customer" page
  const handleCreateNew = () => {
    navigate('/dashboard/customers/add');
  };

  // Navigate to the "edit customer" page
  const handleEdit = (row) => {
    const { id } = row;
    if (id) {
      navigate(`/dashboard/customers/edit/${id}`);
    } else {
      console.error("Customer ID is missing");
    }
  };

  // Delete a single customer
  const handleDelete = async (row) => {
      try {
        const res = await axios.delete(`/customer/delete/${row.id}`);
        if (res.data.success) {
          setAlert({ message: res.data.message, type: "success" });
          setData(data.filter((customer) => customer.id !== row.id));
        } else {
          setAlert({ message: res.data.message, type: "danger" });
        }
      } catch (error) {
        console.error("Error deleting customer", error);
        setAlert({ message: "Error deleting customer", type: "danger" });
      }
    
  };

  // Select or deselect rows
  const handleRowSelect = (row) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(row)
        ? prevSelectedRows.filter((r) => r !== row)
        : [...prevSelectedRows, row]
    );
  };

  // Handle bulk delete of selected customers
  const handleBulkDelete = async () => {
    const idsToDelete = selectedRows.map(row => row.id);
  
    // Log the IDs that are about to be deleted
    console.log("IDs to delete:", idsToDelete);
  
    try {
      const res = await axios.delete(`/customer/bulkdelete`, { data: { ids: idsToDelete } });
  
      // Log the response from the server
      console.log("Server response:", res);
  
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setData(data.filter((customer) => !idsToDelete.includes(customer.id)));
        setSelectedRows([]); // Clear selected rows after deletion
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      console.error("Error deleting Customer:", error);
      setAlert({ message: "Error deleting Customer", type: "danger" });
    }
  };
  

  // Fetch customer data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/customer/all');
        if (res.data.success) {
          const customers = res.data.data.map((customer) => ({
            id: customer._id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            createdAt: new Date(customer.createdAt),
          }));
          setData(customers);
        }
      } catch (error) {
        console.error("Error fetching customer data", error);
        setAlert({ message: "Error fetching customer data", type: "danger" });
      }
    };
    fetchData();
  }, []);

  // Handle status change (e.g., from a dropdown)
  const handleChange = (e) => {
    setStatus(e.value);
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
            <button id="add-brand-btn" type="button" className="btn btn-lg btn-primary" onClick={handleCreateNew}>Add Customer</button>
            <button type="button" className="btn btn-outline-danger" onClick={handleBulkDelete}>Bulk Delete</button>
          </div>
          <div className="col-sm-9">
            <div className="card-body col-9">
              {alert.message && <Alert message={alert.message} type={alert.type} />}
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

export default Customers;
