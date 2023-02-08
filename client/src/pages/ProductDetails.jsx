import React from 'react';
import ProductList from "../product";
import { Row, Col, ListGroup, Button, Image } from "react-bootstrap";

const ProductDetails = ({ match }) => {

    const product = ProductList.find((i) => i._id === match.params.id)
  return (
    <div>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col></Col>
            <Col></Col>
        </Row>
    </div>
  )
}

export default ProductDetails