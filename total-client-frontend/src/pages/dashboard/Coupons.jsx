import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/UserNavbar";
import axios from "axios";
import Alert from "../../components/Alert";
import Table from "../../components/Table";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Coupons = () => {
  const [alert, setAlert] = useState({ message: "", type: "" });
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
      {Header: "Code", accessor: "code"},
      { Header: "Type", accessor: "type" },
      { Header: "Amount", accessor: "amount" },
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

  const handleCreateNew = () => {
    navigate('/dashboard/coupons/add');
  };

  const handleEdit = (row) => {
    const { id } = row;
    if (id) {
      navigate(`/dashboard/coupons/edit/${id}`);
    } else {
      console.error("Brand ID is missing");
    }
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.delete(`/coupon/delete/${row.id}`);
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setData(data.filter((coupon) => coupon.id !== row.id));
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      console.error("Error deleting brand", error);
      setAlert({ message: "Error deleting coupon", type: "danger" });
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
      const res = await axios.delete(`/coupon/bulkdelete`, { data: { ids: idsToDelete } });
      if (res.data.success) {
        setAlert({ message: res.data.message, type: "success" });
        setData(data.filter((coupon) => !idsToDelete.includes(coupon.id)));
        setSelectedRows([]); // Clear selected rows after deletion
      } else {
        setAlert({ message: res.data.message, type: "danger" });
      }
    } catch (error) {
      console.error("Error deleting coupons", error);
      setAlert({ message: "Error deleting coupons", type: "danger" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/coupon/all");
        if (res.data.success) {
            const coupons = res.data.data.map((coupon) => ({
                id: coupon._id,
                name: coupon.name,
                code: coupon.code,
                type:coupon.type,
                amount:coupon.amount,
                status: coupon.status,
          }));
          setData(coupons);
        }
      } catch (error) {
        console.error("Error fetching coupons data", error);
      }
    };
    fetchData();
  }, []);

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
            <button id="add-brand-btn" type="button" className="btn btn-lg btn-primary" onClick={handleCreateNew}>Add Brand</button>
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

export default Coupons;
