import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "react-hot-toast";
import { Row, Col } from "react-bootstrap";
import Products from "./Products";

const Home = () => {
  const [ products, setProducts ] = useState([]);

  const fetchProducts = async () => {
    let { data } = await axios.get(`https://yellow-intern-djrqn.ineuron.app:5000/api/products/all`);
    console.log(data);
    setProducts(data.data);
    if(data.status === 200) {
      Toast.success(data.message);
    }
    console.log(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Row>
        {
          products.map((product) => {
            return <Col md={3} key={product._id}><Products product={product} /></Col>
          })
        }
      </Row>
    </>
  )
}

export default Home