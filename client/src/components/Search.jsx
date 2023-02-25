import React, { useState } from "react";

const Search = ({history}) => {

  const [keyword, setKeyword] = useState("");


  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
        history.push(`/products/${keyword}`);
    } else {
        history.push(`/products`);
    }
  };

  return (
    <>
      <div className="collapse navbar-collapse text-uppercase justify-content-center">
        <form
          className="form-inline d-flex flex-row gap-2"
          onSubmit={searchSubmitHandler}
        >
          <input
            className="form-control"
            type="search"
            placeholder="Search Product..."
            aria-label="Search"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="btn btn-outline-info my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;
