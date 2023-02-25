import React from 'react';
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { NavLink } from "react-router-dom";

const Products = ({product}) => {
  return (
    <>
        <div className="card my-3 p-1">
            <div className="card-body">
                <NavLink to={`/product/${product._id}`}>
                    <Card.Img src={product.images[0].url} alt={product.name} variant="top" />
                </NavLink>
                <div className='p-1'>
                    <NavLink to={`/product/${product._id}`}>
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text mb-2 text-decoration-none">{product.description}</p>
                    </NavLink>
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        {/* {product.rating} from {product.numReviews} reviews */}
                    </div>
                    <div className="my-3">
                        ₹ {product.price}
                    </div>
                </div>
            </div>          
        </div>
    </>
  )
}

export default Products