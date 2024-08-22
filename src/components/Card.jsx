import React, { useState, useEffect } from "react";
import pokeCardBack from "../img/poke-card-back.png";
import "../styles/App.css";

// List of Base Series card IDs
const baseSeriesCardIds = [
  "base1-44",
  "base1-46",
  "base1-63",
  "base1-58",
  "base1-10",
  "base1-68",
  "base1-28",
  "base1-43",
  "base1-52",
  "base1-35",
  "base1-16",
  "base1-26",
  "base1-18",
  "base1-4",
  "base1-2",
  "base1-15",
  "base1-1",
  "base1-6",
  "base1-20",
  "base1-36",
  "base1-56",
];

const Card = ({ onScoreUpdate, onGameReset }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [allImageUrls, setAllImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);

  const API_KEY = import.meta.env.VITE_POKEMON_TCG_API_KEY;

  useEffect(() => {
    const fetchCardImages = async () => {
      try {
        // Function to fetch individual card image
        const fetchCardImage = async (id) => {
          try {
            const response = await fetch(
              `https://api.pokemontcg.io/v2/cards/${id}`,
              {
                headers: {
                  "X-Api-Key": API_KEY,
                },
              }
            );
            if (!response.ok) {
              throw new Error(
                `Error fetching card ${id}: ${response.statusText}`
              );
            }
            const data = await response.json();
            return data.data.images.large;
          } catch (error) {
            console.error(error);
            return null; // Return null if there was an error fetching the image
          }
        };

        // Fetch all Base Series card images
        const imageUrlsArray = await Promise.all(
          baseSeriesCardIds.map((id) => fetchCardImage(id))
        );
        const validImageUrls = imageUrlsArray.filter((url) => url !== null); // Filter out any null values

        // Shuffle and select a subset of image URLs for the game
        const initialImageUrls = getRandomSubset(validImageUrls, 8);
        setAllImageUrls(validImageUrls);
        setImageUrls(initialImageUrls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the images:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCardImages();
  }, [API_KEY]);

  const getRandomSubset = (array, size) => {
    let shuffled = array.slice(0);
    let i = array.length;
    let min = i - size;
    let temp, index;

    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }

    return shuffled.slice(min);
  };

  const handleCardClick = async (index) => {
    const clickedUrl = imageUrls[index];
    if (clickedCards.includes(clickedUrl)) {
      onGameReset();
      setClickedCards([]);
    } else {
      setClickedCards((prev) => [...prev, clickedUrl]);
      onScoreUpdate();

      // Fetch new images for all cards
      try {
        const newImageUrls = getRandomSubset(allImageUrls, 8); // Fetch new images
        setImageUrls(newImageUrls);
      } catch (error) {
        console.error("Error updating card images:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card-container">
      {imageUrls.map((url, index) => (
        <div className="flip-card" key={index}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                className="poke-card"
                src={url}
                alt={`Fetched from API ${index}`}
                onClick={() => handleCardClick(index)}
              />
            </div>
            <div className="flip-card-back">
              <img src={pokeCardBack} alt={"poke-card-back"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
