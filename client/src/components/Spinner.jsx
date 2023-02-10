import React from "react";
import { Spinner as Loader } from "react-bootstrap";

const Spinner = () => {
  return (
    <Loader animation="border" role="status" style={{ width: "100px", height: "100px", margin: "auto", display: "block" }}>
      <span className="sr-only">Loading...</span>
    </Loader>
  );
};

export default Spinner;
