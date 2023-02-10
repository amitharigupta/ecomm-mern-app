import React, { useEffect } from "react";
import Toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Products from "./Products";
import { productList } from "../actions/productActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const Home = () => {
  // const [ products, setProducts ] = useState([]);
  const dispatch = useDispatch();
  const product = useSelector(state => state.productList);
  const { loading, error, products } = product
  const fetchProducts = async () => {
    dispatch(productList())
  }

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  return (
    <>
    {
      loading ? <Spinner /> : error ? <Message>{error}</Message> : 
      <Row>
        {
          products.map((product) => {
            return <Col md={3} key={product._id}><Products product={product} /></Col>
          })
        }
      </Row>
    }
    </>
  )
}

export default Home