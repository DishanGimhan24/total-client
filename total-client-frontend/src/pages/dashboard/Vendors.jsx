import React, {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/UserNavbar';
import axios from 'axios';
import Alert from '../../components/Alert';
import Table from "../../components/Table";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Vendors = () => {

    const [alert, setAlert] = useState({message: '', type: ''});
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const vendor = {
            name: e.target[0].value,
            email: e.target[1].value,
            phone: e.target[2].value,
            address: e.target[3].value
        };

        const res = await axios.post('/vendor/new', vendor);
        if(res.data.success){
            setAlert({message: res.data.message, type: 'success'});
        }else{
            setAlert({message: res.data.message, type: 'danger'});
        }

    };

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
      { Header: "phone", accessor: "phone" },
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

      // Fetch vendors data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/vendor/all");
        if (res.data.success) {
          // Map fetched data to include id for edit/delete actions
          const vendors = res.data.data.map((vendor) => ({
            id: vendor._id,
            name: vendor.name,
            email: vendor.email,
            phone: vendor.phone,
            address: vendor.address,
          }));
          setData(vendors);
        }
      } catch (error) {
        console.error("Error fetching vendors data", error);
      }
    };

    fetchData();
  }, []);
  
    const handleEdit = (row) => {
      const { id } = row;
      if (id) {
        navigate(`/dashboard/vendors/edit/${id}`);
      } else {
        console.error("Vendors ID is missing");
      }
    };

  
    const handleDelete = async (row) => {
      try {
        const res = await axios.delete(`/vendor/delete/${row.id}`);
        if (res.data.success) {
          setAlert({ message: res.data.message, type: "success" });
          setData(data.filter((vendor) => vendor.id !== row.id));
        } else {
          setAlert({ message: res.data.message, type: "danger" });
        }
      } catch (error) {
        console.error("Error deleting vendor", error);
        setAlert({ message: "Error deleting vendor", type: "danger" });
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
        const res = await axios.delete(`/vendor/bulkdelete`, { data: { ids: idsToDelete } });
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
      navigate('/dashboard/vendors/add');
    };

    return(
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
    <button id="add-brand-btn" type="button" class="btn btn-lg btn-primary" onClick={handleCreateNew}>Add Vendor</button>
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

export default Vendors;