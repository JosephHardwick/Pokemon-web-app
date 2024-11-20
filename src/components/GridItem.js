import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { navigate } from "gatsby";

// Define styled components
const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  width: 150px;
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 10px;
  opacity: 0.8;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Info = styled.div`
  .pokemon-name {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
  }
`;

const AddToTeamButton = styled.button`
  position: relative;
  top: 1px;
  right: 1px;
  background-color: #ffcb05;
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

const PokemonCard = ({ name, image, id }) => {
  const handleClick = () => {
    localStorage.setItem('selectedPokemonId', id); // Store ID in local storage
    navigate('/pokeDetail'); // Navigate to detail page
  };

  const handleAddToTeam = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    let team = JSON.parse(localStorage.getItem('pokemonTeam')) || [];
    if (team.length < 6 && !team.includes(id)) {
      team.push(id);
      localStorage.setItem('pokemonTeam', JSON.stringify(team));
      alert(`${name} added to your team!`);
    } else if (team.includes(id)) {
      alert(`${name} is already in your team!`);
    } else {
      alert('Your team is full! Maximum team size is 6.');
    }
  };

  return (
    <Card data-id={id} onClick={handleClick}>
        <AddToTeamButton onClick={handleAddToTeam}>+</AddToTeamButton>
      <ImageContainer>
        <Image src={image} alt={`${name} sprite`} />
      </ImageContainer>
      <Info>
        <h3 className="pokemon-name">{name}</h3>
      </Info>
    </Card>
  );
};



export default PokemonCard;