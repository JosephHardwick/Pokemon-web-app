import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PokemonCard from "../components/GridItem.js";
import Layout from '../components/layout';
import { navigate } from 'gatsby';


// Define styled components
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const fetchPokemonData = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1500`);
    const data = await response.json();
    const pokemonList = await Promise.all(data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.front_default
      };
    }));
    return pokemonList;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return [];
  }
};

const PokemonGrid = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('id');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const getPokemonData = async () => {
      const data = await fetchPokemonData();
      setPokemonList(data);
    };
    getPokemonData();
  }, []);

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  


  const filteredAndSortedPokemonList = pokemonList
    .filter(pokemon => pokemon.name.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => {
      if (sortCriteria === 'id') {
        return a.id - b.id;
      } else if (sortCriteria === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <Layout pageTitle="All Pokemon">
      <Controls>
        <input
          type="text"
          placeholder="Filter by name"
          value={filterText}
          onChange={handleFilterChange}
        />
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
        </select>
      </Controls>
      <GridContainer>
        {filteredAndSortedPokemonList.length > 0 ? (
          filteredAndSortedPokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              id={pokemon.id}
            />
          ))
        ) : (
          <p>No Pokémon available</p>
        )}
      </GridContainer>
    </Layout>
  );
};

export default PokemonGrid;