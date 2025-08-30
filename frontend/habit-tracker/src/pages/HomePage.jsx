import React from "react";
import { Link } from "react-router-dom";
import "../css/HomePage.css";

const HomePage = () => {
  return (
    <div>
      <div className="main-container">
        <div className="element-container">
          <div className="text-container">
            <h1>Ready To Reach Your Full Potential?</h1>
            <p>Your journey to growth and consistency starts here.</p>
          </div>
          <div className="button-container">
            <Link to="/login">
              <button>Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
