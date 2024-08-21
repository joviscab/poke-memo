// App.jsx
import { useState } from "react";
import "../styles/App.css";
import Card from "./Card";
import Scoreboard from "./Scoreboard";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  const handleScoreUpdate = (points) => {
    setCurrentScore((prevScore) => {
      const newScore = prevScore + points;
      setBestScore((prevBestScore) =>
        newScore > prevBestScore ? newScore : prevBestScore
      );
      return newScore;
    });
  };

  const resetScore = () => {
    setCurrentScore(0);
    setClickedCards([]); // Reset clicked cards when score resets
  };

  const trackClickedCards = (cardUrl) => {
    if (clickedCards.includes(cardUrl)) {
      return true; // Card already clicked
    } else {
      setClickedCards([...clickedCards, cardUrl]); // Add card to clicked cards list
      return false; // Card not clicked before
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Poke-memo!</h1>
        <Scoreboard currentScore={currentScore} bestScore={bestScore} />
        <Card
          onScoreUpdate={handleScoreUpdate}
          onGameReset={resetScore}
          trackClickedCards={trackClickedCards}
        />
      </header>
    </div>
  );
}

export default App;
