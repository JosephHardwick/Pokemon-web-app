import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Define styled components
const DetailCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  flex: 0 0 300px; // increased from 200px to 300px
  width: 300px; // increased from 200px to 300px
  height: 300px; // increased from 200px to 300px
  margin-right: 20px;
  opacity: 0.8;
`;

const Image = styled.img`
  width: 100%; // ensure the image takes up the full width of the container
  height: 100%; // ensure the image takes up the full height of the container
  object-fit: contain;
`;

const Info = styled.div`
  flex: 1;
  text-align: left;

  .pokemon-name {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .pokemon-info {
    margin: 5px 0;
  }
`;

const RemoveFromTeamButton = styled.button`
  position: relative;
  bottom: 140px;
  right: 1px;
  background-color: #ff6347;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const PokemonDetailCard = ({ id, name, image, height, weight, baseExperience, types, abilities }) => {
  const [isInTeam, setIsInTeam] = useState(() => {
    const team = JSON.parse(localStorage.getItem('pokemonTeam')) || [];
    return team.includes(id);
  });

  const handleRemoveFromTeam = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    let team = JSON.parse(localStorage.getItem('pokemonTeam')) || [];
    if (team.includes(id)) {
      team = team.filter(pokemonId => pokemonId !== id);
      localStorage.setItem('pokemonTeam', JSON.stringify(team));
      setIsInTeam(false);
    //   alert(`${name} removed from your team!`);
    } else {
      alert(`${name} is not in your team!`);
    }
  };

  if (!isInTeam) return null;

  return (
    <DetailCard data-id={id}>
      <RemoveFromTeamButton onClick={handleRemoveFromTeam}>-</RemoveFromTeamButton>
      <ImageContainer>
        <Image src={image} alt={`${name} sprite`} />
      </ImageContainer>
      
      <Info>
        <h3 className="pokemon-name">{name}</h3>
        <p className="pokemon-info">ID: {id}</p>
        <p className="pokemon-info">Height: {height}</p>
        <p className="pokemon-info">Weight: {weight}</p>
        <p className="pokemon-info">Base Experience: {baseExperience}</p>
        <p className="pokemon-info">Types: {types.join(', ')}</p>
        <p className="pokemon-info">Abilities: {abilities.join(', ')}</p>
      </Info>
    </DetailCard>
  );
};

PokemonDetailCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  baseExperience: PropTypes.number.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PokemonDetailCard;