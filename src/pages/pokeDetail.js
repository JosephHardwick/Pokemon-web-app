import React, { useEffect, useState } from 'react';
import * as styles from './pokemon.module.css';
import Layout from '../components/layout';

const PokeDetail = () => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const id = localStorage.getItem('selectedPokemonId'); // Retrieve ID from local storage
      if (id) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      }
    };
    fetchPokemonDetail();
  }, []);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <Layout pageTitle={pokemon.name}>
      <div className={styles.pokemonContainer}>
        <h1 className={styles.pokemonTitle}>{pokemon.name}</h1>
        <img className={styles.pokemonImage} src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p className={styles.pokemonInfo}>ID: {pokemon.id}</p>
        <p className={styles.pokemonInfo}>Height: {pokemon.height}</p>
        <p className={styles.pokemonInfo}>Weight: {pokemon.weight}</p>
        <p className={styles.pokemonInfo}>Base Experience: {pokemon.base_experience}</p>
        <p className={styles.pokemonInfo}>Types: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        <p className={styles.pokemonInfo}>Abilities: {pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
      </div>
    </Layout>
  );
};

export default PokeDetail;