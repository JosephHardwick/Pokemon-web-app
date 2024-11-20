import React, { useState } from "react";
import * as styles from "./pokemon.module.css";
import Layout from "../components/layout";

// Fetch function to get Pokemon data from PokeAPI
const fetchPokemon = async (pokemonName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
  if (!response.ok) {
    throw new Error('Pokémon not found');
  }
  return await response.json();
};

const PokemonPage = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setError(null); // Reset errors
      const data = await fetchPokemon(pokemonName);
      setPokemonData(data);
    } catch (error) {
      setError(error.message);
      setPokemonData(null);
    }
  };

  const handleAddToTeam = () => {
    let team = JSON.parse(localStorage.getItem('pokemonTeam')) || [];
    if (!team.includes(pokemonData.id)) {
      team.push(pokemonData.id);
      localStorage.setItem('pokemonTeam', JSON.stringify(team));
      alert(`${pokemonData.name} added to your team!`);
    } else {
      alert(`${pokemonData.name} is already in your team!`);
    }
  };

  return (
    <Layout pageTitle="Pokemon Lookup">
      <div className={styles.pokemonContainer}>
        <h1 className={styles.pokemonTitle}>Pokémon Lookup</h1>

        {/* Input Text Box */}
        <input
          type="text"
          placeholder="Enter Pokémon Name"
          value={pokemonName}
          onChange={handleInputChange}
          className={`${styles.pokemonInput} ${styles.matchHeight}`}
        />
        
        {/* Search Button */}
        <button onClick={handleSearch} className={styles.pokemonButton}>
          Search
        </button>

        {/* Error Handling */}
        {error && <p className={styles.errorMessage}>{error}</p>}

        {/* Display Pokémon Data */}
        {pokemonData && (
          <div className={styles.pokemonDetails}>
            <h2 className={styles.pokemonTitle}>{pokemonData.name}</h2>
            <img
              className={styles.pokemonImage}
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
            />
            <p className={styles.pokemonInfo}>Height: {pokemonData.height}</p>
            <p className={styles.pokemonInfo}>Weight: {pokemonData.weight}</p>
            <p className={styles.pokemonInfo}>Base Experience: {pokemonData.base_experience}</p>
            
            <h2>Abilities</h2>
            <ul className={styles.pokemonList}>
              {pokemonData.abilities.map(({ ability }) => (
                <li className={styles.pokemonListItem} key={ability.name}>
                  {ability.name}
                </li>
              ))}
            </ul>
            <button onClick={handleAddToTeam} className={styles.pokemonButton}>
              Add to Team
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PokemonPage;