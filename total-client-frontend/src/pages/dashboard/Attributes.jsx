import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/UserNavbar";
import axios from "axios";
import Alert from "../../components/Alert";
import { useTable } from "react-table";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Attributes = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [status, setStatus] = useState("published");
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const [values, setValues] = useState([]);

  const columns = React.useMemo(
    () => [
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
      { Header: "Attribute Name", accessor: "name" },
      {
        Header: "Values",
        accessor: "values",
        Cell: ({ value }) => (
          <ul>
            {value && value.map((val, index) => (
              <li key={index}>{val}</li>
            ))}
          </ul>
        ),
      },
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
    ],
    [selectedRows]
  );

  const fetchData = async () => {
    try {
      const res = await axios.get("/attribute/all");
      if (res.status === 200 && res.data.success) {
        const attributes = res.data.data.map((attribute) => ({
          id: attribute._id,
          name: attribute.name,
          values: Array.isArray(attribute.values) ? attribute.values : [],
          status: attribute.status,
        }));
        setData(attributes);
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      setAlert({ message: error.response?.data.message || error.message, type: "danger" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const attribute = {
      name: e.target[0].value,
      status: status,
      values: values,
    };

    try {
      const res = await axios.post("/attribute/new", attribute);
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        e.target[0].value = "";
        fetchData();
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      setAlert({ message: error.response?.data.message || error.message, type: "danger" });
    }
  };

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
      const res = await axios.delete(`/attribute/bulkdelete`, { data: { ids: idsToDelete } });
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setData(data.filter((attribute) => !idsToDelete.includes(attribute.id)));
        setSelectedRows([]); // Clear selected rows after deletion
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "Error deleting attributes", type: "danger" });
    }
  };

  const navigateToNewAttribute = () => {
    navigate("/dashboard/attributes/add");
  };

  const handleEdit = (attribute) => {
    navigate(`/dashboard/attributes/edit/${attribute.id}`);
  };

  

  const handleDelete = async (row) => {
    try {
      const res = await axios.delete(`/attribute/delete/${row.id}`);
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setData(data.filter((attribute) => attribute.id !== row.id));
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "Error deleting attribute", type: "danger" });
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
            <button
              id="add-attribute-btn"
              type="button"
              className="btn btn-lg btn-primary"
              onClick={navigateToNewAttribute}
            >
              Add Attribute
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleBulkDelete}
              disabled={selectedRows.length === 0}
            >
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

export default Attributes;
