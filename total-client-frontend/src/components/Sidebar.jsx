import React, { useEffect } from "react";
import styled from "styled-components";
import LogoImg from "../assets/images/logo.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRight from "@mui/icons-material/ChevronRight";
import GridViewIcon from "@mui/icons-material/GridView";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import Person4Icon from "@mui/icons-material/Person4";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import QueryStattsIcon from "@mui/icons-material/QueryStats";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";


const Sidebar = () => {

  return (
    <>
  
  <div>
  <img src={LogoImg} alt="Total" className="logo" />
  <ul class="align-content-between flex-column fw-medium nav p-2 position-relative rounded-sm w-100">
    <li class="nav-item mb-3">
      <a class="nav-link" href="/dashboard"><i class="fas fa-tachometer-alt"></i> <GridViewIcon /> Dashboard</a>
    </li>
    <li class="nav-item mb-3"> 
      <a class="nav-link" href="#"><AccountBalanceIcon /> Finance Management</a>
    </li>
    <li class="nav-item mb-3"> 
      <a class="nav-link" href="/dashboard/customers"><GroupIcon /> Customer Management</a>
    </li>
    <li class="nav-item mb-3">
      <a class="nav-link" href="#"><i class="fas fa-boxes"></i><InventoryIcon /> Inventory Management</a>
    </li>
    <li class="nav-item mb-3"> 
      <a class="nav-link" href="#"><i class="fas fa-user-tie"></i><Person4Icon /> Employee Management</a>
    </li>
    <li class="nav-item mb-3"> 
      <a class="nav-link" href="/dashboard/vendors"><i class="fas fa-handshake"></i><PeopleAltIcon /> Vendor Management</a>
    </li>
    <li class="nav-item mb-3"> 
      <a class="nav-link" href="#"><i class="fas fa-cash-register"></i><PointOfSaleIcon /> Sales & POS</a>
    </li>
    <li class="nav-item mb-3"> 
      <a class="nav-link" href="#"><i class="fas fa-chart-line"></i><QueryStattsIcon /> Reporting & Analytics</a>
    </li>
    <li class="nav-item mb-3"> 
      <a class="nav-link" href="#"><SettingsIcon /> System Settings</a>
    </li>
    <li class="nav-item mb-3">
      <a class="nav-link" href="#"><HelpOutlineIcon /> Help & Support</a>
    </li>
  </ul>
</div>

  </>
  );
};

export default Sidebar;

