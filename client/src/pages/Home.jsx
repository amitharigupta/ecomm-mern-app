import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Products from "./Products";
import { productList } from "../actions/productActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Pagination from "react-js-pagination";

const Home = () => {
  const [ currentPage, setCurrentPage ] = useState(1);

  const dispatch = useDispatch();
  const product = useSelector((state) => state.productList);
  console.log(product);
  const { loading, error, products, productsCount, resultPerPage } = product;
  const fetchProducts = async () => {
    dispatch(productList());
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => {
              return (
                <Col md={3} key={product._id}>
                  <Products product={product} />
                </Col>
              );
            })}
          </Row>
          <div className="pagination">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"1st"}
              lastPageText={"Last"}
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
