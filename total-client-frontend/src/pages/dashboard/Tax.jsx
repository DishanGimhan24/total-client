import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/UserNavbar";
import axios from "axios";
import Alert from "../../components/Alert";
import Select from "react-select";
import Table from "../../components/Table";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const Tax = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [status, setStatus] = useState("published");
  const [data, setData] = useState([]);
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
    { Header: "Tax Rate", accessor: "rate" },
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



 

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/tax/all');
      if (res.data.success) {
        const taxs = res.data.data.map((tax) => ({
          id: tax._id,
          name: tax.name,
          rate: tax.rate,
          status: tax.status,
        }));
        setData(taxs);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tax = {
      name: e.target[0].value,
      rate: e.target[1].value,
      status: status,
    };

    const res = await axios.post("/tax/new", tax);
    if (res.data.success) {
      setAlert({ message: res.data.message, type: "success" });
    } else {
      setAlert({ message: res.data.message, type: "danger" });
    }
  };

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption.value);
  };
  const handleEdit = (row) => {
    const { id } = row;
    if (id) {
      navigate(`/dashboard/tax/edit/${id}`);
    } else {
      console.error("tax ID is missing");
    }
  };

  const handleDelete = async (row) => {
    try {
      console.log(`Attempting to delete tax with id: ${row.id}`);
      const res = await axios.delete(`/tax/delete/${row.id}`);
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setData(data.filter((tax) => tax.id !== row.id));
        console.log(`Successfully deleted tax with id: ${row.id}`);
      } else {
        setAlert({ message: res.data.message, type: "danger" });
        console.error(`Failed to delete tax with id: ${row.id} - ${res.data.message}`);
      }
    } catch (error) {
      console.error(`Error deleting tax with id: ${row.id}`, error);
      setAlert({ message: "Error deleting tag", type: "danger" });
    }
  };;

  const handleRowSelect = (row) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(row)
        ? prevSelectedRows.filter((r) => r !== row)
        : [...prevSelectedRows, row]
    );
  };

  const handleBulkDelete = async () => {
    const idsToDelete = selectedRows.map(row => row.id);
    try {
      const res = await axios.delete(`/tax/bulkdelete`, { data: { ids: idsToDelete } });
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setData(data.filter((tax) => !idsToDelete.includes(tax.id)));
        setSelectedRows([]); // Clear selected rows after deletion
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      console.error("Error deleting tags", error);
      setAlert({ message: "Error deleting tags", type: "danger" });
    }
  };

  const handleCreateNew = () => {
    navigate('/dashboard/tax/add');
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
            <div className=" justify-content-between mb-3">
              <Navbar />
            </div>
            </div>
            </div>


            <div class="btn-container">
    <button id="add-brand-btn" type="button" class="btn btn-lg btn-primary" onClick={handleCreateNew}>Add Brand</button>
    <button type="button" class="btn btn-outline-danger" onClick={handleBulkDelete}>Bulk Delete</button>
  </div>           
   
   
           < div className="col-sm-9">     
          <div className="card-body col-9">
                
                {data.length > 0 && (
          <>
            
            <Table columns={columns} data={data} />
          </>
        )}
        </div>
        </div>
        </div>
    </div>
  </div>
  );
};

export default Tax;