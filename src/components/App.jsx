import { useState } from "react";
import "../styles/App.css";
import Card from "./Card";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Poke-memo!</h1>
        <Card />
      </header>
    </div>
  );
}

export default App;
