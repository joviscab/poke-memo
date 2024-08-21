import React, { useState, useEffect } from "react";
import pokeCardBack from "../img/poke-card-back.png";
import "../styles/App.css";

const Card = ({ onScoreUpdate, onGameReset, trackClickedCards }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [allImageUrls, setAllImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_POKEMON_TCG_API_KEY;

  useEffect(() => {
    const fetchCardImages = async () => {
      try {
        const cachedImageUrls = localStorage.getItem("original151CardImages");

        if (cachedImageUrls) {
          const imageUrlsArray = JSON.parse(cachedImageUrls);
          setAllImageUrls(imageUrlsArray);

          const randomImageUrls = getRandomSubset(imageUrlsArray, 10);
          setImageUrls(randomImageUrls);
          setLoading(false);
        } else {
          const response = await fetch(
            "https://api.pokemontcg.io/v2/cards?pageSize=1000", // Fetch a large number of cards
            {
              headers: {
                "X-Api-Key": API_KEY,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Error fetching cards: ${response.statusText}`);
          }
          const data = await response.json();
          const original151Cards = data.data.filter((card) =>
            card.nationalPokedexNumbers.some(
              (number) => number >= 1 && number <= 151
            )
          );

          const imageUrlsArray = original151Cards.map(
            (card) => card.images.large
          );

          localStorage.setItem(
            "original151CardImages",
            JSON.stringify(imageUrlsArray)
          );
          setAllImageUrls(imageUrlsArray);

          const randomImageUrls = getRandomSubset(imageUrlsArray, 10);
          setImageUrls(randomImageUrls);
          setLoading(false);
        }
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

  const handleCardClick = (index, url) => {
    if (trackClickedCards(url)) {
      onGameReset(); // Reset the score
    } else {
      onScoreUpdate(1); // Increment the score by 1
      const newImage = getRandomSubset(allImageUrls, 1)[0];
      setImageUrls((prevImageUrls) =>
        prevImageUrls.map((currentUrl, i) =>
          i === index ? newImage : currentUrl
        )
      );
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
                onClick={() => handleCardClick(index, url)}
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
