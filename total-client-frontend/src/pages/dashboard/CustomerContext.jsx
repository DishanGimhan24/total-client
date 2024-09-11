// src/contexts/CustomerContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("/customer/all");
        if (res.data.success) {
          const customers = res.data.data.map((customer) => ({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            address: customer.address,
            company: customer.company,
            phone: customer.phone,
            createdAt: new Date(customer.createdAt),
          }));
          setCustomers(customers);
          setCustomerCount(customers.length);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <CustomerContext.Provider value={{ customers, customerCount }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
