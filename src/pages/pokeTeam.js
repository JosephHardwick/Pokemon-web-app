import React, { useEffect, useState } from "react";
import PokemonDetailCard from "../components/PokemonDetailCard";
import Layout from "../components/layout";

const PokeTeam = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      const teamIds = JSON.parse(localStorage.getItem("pokemonTeam")) || [];
      const teamData = await Promise.all(
        teamIds.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();
          return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            height: data.height,
            weight: data.weight,
            baseExperience: data.base_experience,
            types: data.types.map((typeInfo) => typeInfo.type.name),
            abilities: data.abilities.map((abilityInfo) => abilityInfo.ability.name),
          };
        })
      );
      setTeam(teamData);
    };

    fetchTeamData();
  }, []);

  return (
    <Layout pageTitle="My Pokémon Team">
      <div>
        {team.length > 0 ? (
          team.map((pokemon) => (
            <PokemonDetailCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              height={pokemon.height}
              weight={pokemon.weight}
              baseExperience={pokemon.baseExperience}
              types={pokemon.types}
              abilities={pokemon.abilities}
            />
          ))
        ) : (
          <p>No Pokémon in your team</p>
        )}
      </div>
    </Layout>
  );
};

export default PokeTeam;