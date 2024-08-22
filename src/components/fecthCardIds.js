import fetch from "node-fetch"; // Ensure you have node-fetch installed
import { writeFileSync } from "fs";

const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
const popularPokemon = [
  "Bulbasaur",
  "Charmander",
  "Squirtle",
  "Pikachu",
  "Eevee",
  "Jigglypuff",
  "Meowth",
  "Psyduck",
  "Snorlax",
  "Gengar",
  "Mewtwo",
  "Mew",
  "Vulpix",
  "Growlithe",
  "Abra",
  "Machop",
  "Geodude",
  "Magikarp",
  "Ditto",
  "Lapras",
  "Articuno",
  "Zapdos",
  "Moltres",
  "Dratini",
  "Dragonair",
  "Dragonite",
  "Charizard",
  "Blastoise",
  "Venusaur",
  "Alakazam",
  "Gyarados",
  "Scyther",
  "Electabuzz",
  "Magmar",
  "Pinsir",
  "Tauros",
  "Lapras",
  "Aerodactyl",
  "Kabuto",
  "Kabutops",
  "Omanyte",
  "Omastar",
  "Dratini",
  "Dragonair",
  "Dragonite",
  "Mewtwo",
  "Mew",
  "Gengar",
  "Onix",
  "Rhydon",
];

// Function to fetch card data filtered by Base Series
const fetchCardData = async (pokemon, setCode) => {
  try {
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=name:${pokemon}+set.id:${setCode}`,
      {
        headers: {
          "X-Api-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching cards for ${pokemon}: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data.map((card) => card.id);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchCardIds = async () => {
  try {
    const allCardIds = [];
    const setCode = "base1"; // Base Set Series code

    for (const pokemon of popularPokemon) {
      const cardIds = await fetchCardData(pokemon, setCode);
      allCardIds.push(...cardIds);

      // To avoid fetching too many cards, break the loop if we have enough IDs
      if (allCardIds.length >= 50) break;
    }

    // Deduplicate IDs if necessary and limit to the first 50
    const uniqueCardIds = [...new Set(allCardIds)].slice(0, 50);

    console.log("Card IDs:", uniqueCardIds);

    // Save these IDs to a file named card-ids.json
    writeFileSync("card-ids.json", JSON.stringify(uniqueCardIds, null, 2));
  } catch (error) {
    console.error("Error fetching card IDs:", error);
  }
};

fetchCardIds();
