import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/UserNavbar";
import axios from "axios";
import Alert from "../../components/Alert";
import Table from "../../components/Table";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Tags = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
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
      const res = await axios.get('/tag/all');
      if (res.data.success) {
        const tags = res.data.data.map((tag) => ({
          id: tag._id,
          name: tag.name,
        }));
        setData(tags);
      }
    };
    fetchData();
  }, []);

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
      navigate(`/dashboard/tags/edit/${id}`);
    } else {
      console.error("Brand ID is missing");
    }
  };

  const handleDelete = async (row) => {
    try {
      console.log(`Attempting to delete tag with id: ${row.id}`);
      const res = await axios.delete(`/tag/delete/${row.id}`);
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setData(data.filter((tag) => tag.id !== row.id));
        console.log(`Successfully deleted tag with id: ${row.id}`);
      } else {
        setAlert({ message: res.data.message, type: "danger" });
        console.error(`Failed to delete tag with id: ${row.id} - ${res.data.message}`);
      }
    } catch (error) {
      console.error(`Error deleting tag with id: ${row.id}`, error);
      setAlert({ message: "Error deleting tag", type: "danger" });
    }
  };

  const handleBulkDelete = async () => {
    const idsToDelete = selectedRows.map(row => row.id);
    try {
      const res = await axios.delete(`/tag/bulkdelete`, { data: { ids: idsToDelete } });
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setData(data.filter((tag) => !idsToDelete.includes(tag.id)));
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
    navigate('/dashboard/tags/add');
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
            <button id="add-brand-btn" type="button" className="btn btn-lg btn-primary" onClick={handleCreateNew}>
              Add Tag
            </button>
            <button type="button" className="btn btn-outline-danger" onClick={handleBulkDelete}>
              Bulk Delete
            </button>
          </div>
          <div className="col-sm-9">
            <div className="card-body col-9">
              {data.length > 0 && <Table columns={columns} data={data} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
