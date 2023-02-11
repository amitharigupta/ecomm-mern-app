import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetailsList } from "../actions/productActions";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const ProductDetails = () => {
  let { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;
  const fetchProduct = async () => {
    dispatch(productDetailsList(id));
  };

  useEffect(() => {
    fetchProduct();
  }, [dispatch]);

  const addToCartHandler = () => {
    console.log("Add to Cart button clicked");
    history(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          <Link to="/" className="text-decoration-none">
            {" "}
            <i className="fas fa-arrow-left"></i> &nbsp; GO BACK
          </Link>
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
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price : ${product.price}</ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroupItem className="mt-3">
                <Row>
                  <Col>Status :</Col>
                  <Col>
                    {product.countInStock > 0 ? `In Stock` : `Out Of Stock`}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem className="mt-3">
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem className="mt-3">
                <Button className="btn-block" onClick={addToCartHandler}>
                  Add to Cart
                </Button>
              </ListGroupItem>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
