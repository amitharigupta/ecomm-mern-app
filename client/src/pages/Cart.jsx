import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import "../styles/Cart.css";

const Cart = ({ match }) => {
  const history = useNavigate();
  let { id: productId } = useParams();

  const [searchParams] = useSearchParams();
  let qty = searchParams.get("qty");

  const dispatch = useDispatch();

  const increaseQuantity = (id, quantity, stock) => {
    console.log(id, quantity, stock);
    const newQty = +quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    console.log(id, quantity);
    const newQty = +quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history("/login?redirect=shipping");
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty !<Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems &&
                cartItems.map((item, id) => (
                  <ListGroupItem key={id}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={item.image.url}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>₹ {item.price}</Col>
                      <Col md={2} className={"cartInput"}>
                        <button
                          onClick={() => {
                            decreaseQuantity(item.product, item.qty);
                          }}
                        >
                          -
                        </button>
                        <input type="number" value={item.qty} readOnly />
                        <button
                          onClick={() => {
                            increaseQuantity(
                              item.product,
                              item.qty,
                              item.stock
                            );
                          }}
                        >
                          +
                        </button>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  subtotal (
                  {cartItems.reduce((acc, item) => acc + +item.qty, 0)}) items
                </h2>
                ₹ &nbsp;
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkOut
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
