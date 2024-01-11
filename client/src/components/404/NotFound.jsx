import React from "react";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="mainNotFound">
      {" "}
      &nbsp;
      <h1 className="notFoundHeading">404 Not Found</h1>
      <div className="notFound">
        <p>The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
