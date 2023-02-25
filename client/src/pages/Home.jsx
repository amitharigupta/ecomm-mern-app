import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Products from "./Products";
import { productList } from "../actions/productActions";
import { categoryList } from "../actions/categoryActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Pagination from "react-js-pagination";
import "../styles/Home.css";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [categoryId, setCategoryId] = useState("");
  const [ratings, setRatings] = useState(0);

  const dispatch = useDispatch();
  const product = useSelector((state) => state.productList);
  const category = useSelector((state) => state.categoryList);
  // console.log(category);
  const { loading, error, products, productsCount, resultPerPage } = product;
  const { categories } = category;
  const fetchProducts = async () => {
    dispatch(productList(currentPage, price, categoryId));
  };

  const fetchCategorys = async () => {
    dispatch(categoryList());
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const setCategory = (e) => {
    // console.log(e.target.value);
    setCategoryId(e.target.value);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategorys();
  }, [dispatch, currentPage, price, categoryId]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={4}>
              {/* Price Filter */}
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={50000}
              />
            </Col>
            <Col md={4}>
              {/* Category Filter */}
              <div className="row categoryBox">
                <div className="col-md-3 Categories">
                  <Typography>Categories</Typography>
                  <select
                    className="form-select"
                    onChange={(e) => setCategory(e)}
                    style={{ width: "14rem"}}
                  >
                    <option value={""}>Select Category</option>
                    {categories.map((i) => {
                      return (
                        <>
                          <option
                            className="category-link"
                            key={i._id}
                            value={i._id}
                          >
                            {i.name}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
            </Col>

            <Col md={4}>
              {/* Rating Filter */}
              <fieldset>
                <Typography component={"legend"}>Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                ></Slider>
              </fieldset>
            </Col>
          </Row>

          <Row>
            {products.map((product) => {
              return (
                <>
                  <Col md={4} key={product._id}>
                    <Products product={product} />
                  </Col>
                </>
              );
            })}
          </Row>

          {resultPerPage < productsCount && (
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
          )}
        </>
      )}
    </>
  );
};

export default Home;
