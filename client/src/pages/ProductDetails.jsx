import React from 'react';
import ProductList from "../product";
import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Button, Image, ListGroupItem } from "react-bootstrap";
import Rating from '../components/Rating';

const ProductDetails = ({ match }) => {
      let { id } = useParams();
    const product = ProductList.find((i) => i._id === id)
  return (
    <div>
      <Link to="/" className="text-decoration-none"> <i className="fas fa-arrow-left"></i> &nbsp; GO BACK</Link>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                </ListGroupItem>
                <ListGroupItem>Price : ${product.price}</ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
                <ListGroupItem>
                  <Row>
                    <Col>Status :</Col>
                    <Col>{product.countInStock > 0 ? `In Stock` : `Out Of Stock`}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Button className="btn-block">Add to Cart</Button>
                </ListGroupItem>
            </Col>
        </Row>
    </div>
  )
}

export default ProductDetails