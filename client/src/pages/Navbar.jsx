import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Navbar = () => {
  return (
    <>
      <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Amizona
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-uppercase" id="navbarColor02">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                <i className="fa-solid fa-house"></i> Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/product">
                <i className="fa-brands fa-product-hunt"></i> Product
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <i className="fa-solid fa-cart-shopping"></i> Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                <i className="fa-solid fa-right-to-bracket"></i> Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sigin">
                <i className="fa-solid fa-user"></i> Signin
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </Nav>
    </>
  );
};

export default Navbar;
