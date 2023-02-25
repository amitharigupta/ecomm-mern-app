import "./App.css";
import "./styles/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Product from "./pages/Product.jsx";
import Search from "./components/Search.jsx";

import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <>
      <Header />
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart/:id?" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/forgot-password/:id" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product" element={<Product />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
