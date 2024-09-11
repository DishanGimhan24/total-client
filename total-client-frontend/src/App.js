import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/dashboard/UserDashboard";
import Users from "./pages/dashboard/Users";
import Vendors from "./pages/dashboard/Vendors";
import Categories from "./pages/dashboard/Categories";
import Tags from "./pages/dashboard/Tags";
import Tax from "./pages/dashboard/Tax";
import Attributes from "./pages/dashboard/Attributes";
import Brands from "./pages/dashboard/Brands";
import Customers from "./pages/dashboard/Customers";
import Products from "./pages/dashboard/Products";
import "./assets/css/styles.css";
import { FlagsProvider } from "react-feature-flags";
import { modules } from "./modules.js";
import { CustomerProvider } from "./pages/dashboard/CustomerContext.jsx";
import { DataProvider } from "./pages/dashboard/DataContext.jsx";

import NewAttribute from "./pages/dashboard/forms/NewAttribute";
import BrandForm from "./pages/dashboard/forms/BrandForm";
import VendorForm from "./pages/dashboard/forms/VendorForm";
import CategoryForm from "./pages/dashboard/forms/CategoriesForm";
import TagForm from "./pages/dashboard/forms/TagForm";
import TaxForm from "./pages/dashboard/forms/TaxForm";
import CustomerForm from "./pages/dashboard/forms/CustomerForm";
import UserForm from "./pages/dashboard/forms/UserForm";
import ProductForm from "./pages/dashboard/forms/ProductForm";
import DropdownForm from "./pages/dashboard/DropdownForm";
import DisplayPage from "./pages/DisplayPage";
import SelectedAttributes from "./pages/dashboard/SelectedAttributes";
import Coupons from "./pages/dashboard/Coupons";
import CouponsForm from "./pages/dashboard/forms/CouponsForm";
import Currency from "./pages/dashboard/Currency";
import Orders from "./pages/dashboard/Orders";
import OrderForm from "./pages/dashboard/forms/OrderForm";
import CurrencyForm from "./pages/dashboard/forms/CurrencyForm";
import CityList from "./pages/dashboard/CityList";

const theme = {
  colors: {
    primary: "#0D062D",
    secondary: "#1777CF",
    dark: "#3A3F51",
    light: "#B2B2B2",
    white: "#FFFFFF",
    overlay: "#0d062dbb",
    success: "#66C87B",
    danger: "#ED544E",
    warning: "#F4C700",
  },
  fonts: ["sans-serif", "Inter"],
  fontSizes: {
    primary: "40px",
    secondary: "30px",
    h3: "24px",
    h4: "18px",
    h5: "16px",
    h6: "14px",
    span: "12px",
    text: "16px",
    button: "16px",
    icon: "24px",
  },
};

const Container = styled.div`
  display: flex;
`;

const Main = styled.div``;

const Wrapper = styled.div``;

function App() {
  return (
    <FlagsProvider value={modules}>
      <ThemeProvider theme={theme}>
      <DataProvider>
        <CustomerProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/register" element={<UserRegister />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/" element={<UserDashboard />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/dashboard/users" element={<Users />} />
              <Route path="/dashboard/vendors" element={<Vendors />} />
              <Route path="/dashboard/categories" element={<Categories />} />
              <Route path="/dashboard/tags" element={<Tags />} />
              <Route path="/dashboard/tax" element={<Tax />} />
              <Route path="/dashboard/attributes" element={<Attributes />} />
              <Route path="/dashboard/brands" element={<Brands />} />
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/customers" element={<Customers />} />
              <Route path="/dashboard/customers/add" element={<CustomerForm />} />
              <Route path="/dashboard/customers/edit/:id" element={<CustomerForm />} />
              <Route path="/dashboard/attributes/add" element={<NewAttribute/>} />
              <Route path="/dashboard/attributes/edit/:id" element={<NewAttribute />} />
              <Route path="/dashboard/brands/add" element={<BrandForm/>} />
              <Route path="/dashboard/brands/edit/:id" element={<BrandForm/>} />
              <Route path="/dashboard/vendors/add" element={<VendorForm/>} />
              <Route path="/dashboard/vendors/edit/:id" element={<VendorForm/>} />
              <Route path="/dashboard/categories/edit/:id" element={<CategoryForm/>} />
              <Route path="/dashboard/categories/add" element={<CategoryForm/>} />
              <Route path="/dashboard/tags/add" element={<TagForm/>} />
              <Route path="/dashboard/tags/edit/:id" element={<TagForm/>} />
              <Route path="/dashboard/tax/add" element={<TaxForm/>} />
              <Route path="/dashboard/tax/edit/:id" element={<TaxForm/>} />
              <Route path="/dashboard/users/add" element={<UserForm />} />
              <Route path="/dashboard/proform" element={<ProductForm/>} />
              <Route path="/attribute-dropdown" element={<DropdownForm/>} />
              <Route path="/display-page" element={<DisplayPage/>} />
              <Route path="/temp" element={<SelectedAttributes/>} />
              <Route path="/dashboard/coupons" element={< Coupons/>} />
              <Route path="/dashboard/coupons/add" element={< CouponsForm/>} />
              <Route path="/dashboard/coupons/edit/:id" element={< CouponsForm/>} />
              <Route path="/dashboard/currency" element={<Currency/>} />
              <Route path="/dashboard/currency/add" element={<CurrencyForm/>} />
              <Route path="/dashboard/currency/edit/:id" element={<CurrencyForm/>} />
              <Route path="/dashboard/orders" element={<Orders/>} />
              <Route path="/dashboard/orders/add" element={<OrderForm/>} />
              <Route path="/dashboard/orders/edit/:id" element={<OrderForm/>} />
              <Route path="/city" element={<CityList/>} />

              

            
            </Routes>
          </BrowserRouter>
        </CustomerProvider>
        </DataProvider>
      </ThemeProvider>
    </FlagsProvider>
  );
}

export default App;
