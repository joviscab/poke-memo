import React from "react";
import "../styles/App.css";

const Scoreboard = ({ currentScore, bestScore }) => {
  return (
    <div className="scoreboard">
      <div className="current-score">
        <h2>Current Score: {currentScore}</h2>
      </div>
      <div className="best-score">
        <h2>Best Score: {bestScore}</h2>
      </div>
    </div>
  );
};

export default Scoreboard;
