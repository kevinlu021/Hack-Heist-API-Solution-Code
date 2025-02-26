// src/components/NextBusTracker.js
import React, { useState } from 'react';

function PokemonSearch() {
  const [pokemonName, setPokemonName] = useState('');
  const [spriteUrl, setSpriteUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // submitting empty search bar
    if (!pokemonName.trim()) {
      setError("Please enter a Pokémon name.");
      setSpriteUrl("");
      return;
    }

    // clear any previous errors
    setError("");

    console.log('Fetching data for pokemon:', pokemonName);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokémon not found. Please try again.");
        }
        return response.json();
      })
      .then((data) => {
        setSpriteUrl(data.sprites.front_default);
        setError(""); // Clear any previous errors
      })
      .catch((err) => {
        setError(err.message);
        setSpriteUrl(""); // Clear the sprite if an error occurs
      });
  };
  return (
    <div className="tracker-container">
      <h1>Pokemon Displayer</h1>
        <div style = {{ width: "150px", height: "150px" }}>
          {spriteUrl ? <img src={spriteUrl} alt={pokemonName} style={{ width: "150px", height: "150px" }} /> : <></>}
        </div>
      <form onSubmit={handleSubmit} className="tracker-form">
        <label htmlFor="pokemon" className="tracker-label">
          Enter a Pokemon:
        </label>
        <input
          type="text"
          id="pokemon"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="e.g., 201"
          className="tracker-input"
        />
        <button type="submit" className="tracker-button">
          Show Pokemon
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default PokemonSearch;
