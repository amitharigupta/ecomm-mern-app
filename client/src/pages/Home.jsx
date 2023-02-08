import React from 'react'
import ProductList from "../product.js";
import { Row, Col } from "react-bootstrap";
import Products from "./Products";

const Home = () => {

  return (
    <>
      <Row>
        {
          ProductList.map((product) => {
            return <Col md={3} key={product._id}><Products product={product} /></Col>
          })
        }
      </Row>
    </>
  )
}

export default Home