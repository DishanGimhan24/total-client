import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/UserNavbar";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Select from "react-select";
import "../../assets/css/styles.css";
import Alert from "../../components/Alert";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../../redux/userSlice.js";
import Table from "../../components/Table";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Users = () => {
  const [alert, setAlert] = useState({ type: "", message: "" });
   const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const dispatch = useDispatch();

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
    { Header: "Address", accessor: "address" },
    { Header: "Status", accessor: "status" },
    { Header: "DOB", accessor: "dob" },
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
  const handleEdit = (row) => {
    console.log(row);
    // go to edit page
  };

  const handleDelete = async (row) => {
    console.log(row);
    // delete brand logic
  };

  const handleRowSelect = (row) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(row)
        ? prevSelectedRows.filter((r) => r !== row)
        : [...prevSelectedRows, row]
    );
  };


  const handleBulkDelete = async (row) => {
    console.log(row);
  };

//fecthing users
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/user/all');
      if(res.data.success){
        const users = res.data.data.map(user => {
          return {
            name: user.name,
            email: user.email,
            address: user.address,
            status: user.status,
            dob: user.dob,
          }
        });
        setData(users);
      }
    };
    fetchData();
  }, []);

  //fill fields on user select
  const handleChange = (e) => {
    const userId = e.value;
    const user = users.find((user) => user._id === userId);
    document.querySelector('#update-form input[type="text"]').value = user.name;
    document.querySelector('#update-form input[type="email"]').value =
      user.email;
    setSelectedUser(user);
  };

  const handleRoleChange = (e) => {
    setUserRole(e.value);
  };
  const handleCreateNew = () => {
    // Logic to handle creation of new brand
    console.log("Create new brand logic here...");
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.querySelector(
      '#update-form input[type="text"]'
    ).value;
    const email = document.querySelector(
      '#update-form input[type="email"]'
    ).value;
    const role = userRole;
    const userId = selectedUser._id;
    const data = {
      name,
      email,
      role,
    };
    const res = await axios.put(`/user/update/${userId}`, data);
    if (res.data.success) {
      setAlert({ type: "success", message: res.data.message });
      dispatch(loginSuccess(res.data.data));
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
            <div className=" justify-content-between mb-3">
              <Navbar />
            </div>
            </div>
            </div>


            <div class="btn-container">
    <button id="add-brand-btn" type="button" class="btn btn-lg btn-primary">Add Users</button>
    <button type="button" class="btn btn-outline-danger">Bulk Delete</button>
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

export default Users;
