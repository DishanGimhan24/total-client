import React, { useContext, useState, useEffect } from "react";
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/UserNavbar';
import BarChart from './BarChart';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import CustomerContext from "./CustomerContext";

const UserDashboard = () => {
  const { customers, customerCount } = useContext(CustomerContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <input type="checkbox" id="menuToggle" checked={isSidebarOpen} onChange={toggleSidebar} className="d-none" />
        <label className="toggle" htmlFor="menuToggle">
          <span className="top_line common"></span>
          <span className="middle_line common"></span>
          <span className="bottom_line common"></span>
        </label>
        <div className={`col-md-3 vh-100 col-12 sidenav ${isSidebarOpen ? 'open' : 'closed'}`} id="sidenav">
          <Sidebar />
        </div>
        <div className={`col ${isSidebarOpen ? 'col-md-9' : 'col-md-12'} main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Navbar />
          <div className="row">
            <div className="col-md-8 col-12">
              <div className="row">
                <div className="col-sm-4 col-12 card-custom mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title" id="card-header">
                        Total Customers
                        <i className="bi bi-people icon-custom position-absolute top-0 end-0 m-2"></i>
                      </h5>
                      <p className="card-text">{customerCount}</p>
                      <p className="card-text"><small className="text-success">10% vs. previous month</small></p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 col-12 card-custom mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title" id="card-header">
                        Total Orders
                        <i className="bi bi-person-check icon-custom position-absolute top-0 end-0 m-2"></i>
                      </h5>
                      <p className="card-text">350</p>
                      <p className="card-text"><small className="text-success">10% vs. previous month</small></p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 col-12 card-custom mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title" id="card-header">
                        Total Sales
                        <i className="bi bi-currency-dollar icon-custom position-absolute top-0 end-0 m-2"></i>
                      </h5>
                      <p className="card-text">$3.68K</p>
                      <p className="card-text"><small className="text-danger">8% vs. previous month</small></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">Statistics</h5>
                  <div className="chart-container">
                    <BarChart />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 card-custom mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Recent Activity</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Karen Hope - INV-2023-001<br />just now</li>
                    <li className="list-group-item">Karen Hope - INV-2023-002<br />just now</li>
                    <li className="list-group-item">Ruben Calzoni - INV-2023-003<br />just now</li>
                    <li className="list-group-item">Zain Vaccaro - INV-2023-004<br />just now</li>
                    <li className="list-group-item">Zaire Bergson - INV-2023-005<br />just now</li>
                    <li className="list-group-item">Jamnes Speti - INV-2023-005<br />just now</li>
                  </ul>
                  <center><a href="#" className="btn btn-primary mt-3">See All</a></center>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <label htmlFor="filterBy">Filter By:</label>
                  <select id="filterBy" className="ml-2 rounded-pill py-2 px-4">
                    <option>All Data</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div>
                  <button className="btn btn-link">List View</button>
                  <button className="btn btn-link">Table View</button>
                  <button className="btn btn-outline-secondary m-3 px-4 rounded-pill"><PlayForWorkIcon /> Import Data</button>
                  <button className="btn btn-outline-secondary px-4 rounded-pill">Export Data</button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Customer Data</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Contact Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Estimate Value</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.address}</td>
                      <td>{customer.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
