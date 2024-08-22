import { useState } from "react";
import "../styles/App.css";
import Card from "./Card";
import Footer from "./Footer";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleScoreUpdate = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const handleGameReset = () => {
    setBestScore((prevBestScore) =>
      score > prevBestScore ? score : prevBestScore
    );
    setScore(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">Poke-memo!</h1>
        <h5 className="app-sub-title">
          Earn points by clicking each image only once! Try to remember which
          cards you've already clicked to avoid duplicates.
        </h5>
        <div className="scoreboard">
          <p className="current-score">Current Score: {score}</p>
          <p className="best-score">Best Score: {bestScore}</p>
        </div>
        <Card onScoreUpdate={handleScoreUpdate} onGameReset={handleGameReset} />
      </header>
      <Footer />
    </div>
  );
}

export default App;
