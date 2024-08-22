import { useState } from "react";
import "../styles/App.css";
import Card from "./Card";

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
        <h1>Poke-memo!</h1>
        <div className="scoreboard">
          <p>Current Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
        <Card onScoreUpdate={handleScoreUpdate} onGameReset={handleGameReset} />
      </header>
    </div>
  );
}

export default App;
