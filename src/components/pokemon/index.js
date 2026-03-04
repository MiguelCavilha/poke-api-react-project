import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemon } from '../../services/poke-api';
import { Abilities } from './abilities'
import { ThemeContext } from '../../contexts/toggler.js';
import { useContext } from 'react';
import { styled, keyframes } from 'styled-components';
import { typeColors } from '../../utility/colors.js';





function PokemonDetails() {



  const [pokemon, setPokemon] = useState();

  const navigate = useNavigate()

  const { name } = useParams();

  useEffect(() => {
    getPokemon(name)
      .then(pokemon => setPokemon(pokemon))
  }, [name]);


  const { theme } = useContext(ThemeContext);
  const types = pokemon?.types.map(type => type.type.name) || [];
  const color = types.length > 1
    ? `linear-gradient(135deg, ${typeColors[types[0]]} 0%, ${typeColors[types[1]]} 100%)`
    : typeColors[types[0]];

  if (!pokemon) return <LoadingContainer><LoadingText>Loading...</LoadingText></LoadingContainer>;

  return (
    <Div style={{ color: theme.color, backgroundColor: theme.background }} >
      <PokedexContainer>
        <PokedexTop style={{ background: color }}>
          <PokedexLid>
            <LidCircle />
            <LidLight />
          </PokedexLid>
          <Button onClick={() => navigate(-1)}>← Back</Button>
          <PokemonImageContainer>
            <Img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
          </PokemonImageContainer>
          <H1>#{pokemon.id} {pokemon.name}</H1>
          <TypesContainer>
            {pokemon.types.map(type => (
              <TypeBadge key={type.type.name} typeColor={typeColors[type.type.name]}>{type.type.name}</TypeBadge>
            ))}
          </TypesContainer>
        </PokedexTop>

        <PokedexBottom>
          <StatsGrid>
            <StatCard>
              <StatLabel>Height</StatLabel>
              <StatValue>{pokemon.height / 10}m</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Weight</StatLabel>
              <StatValue>{pokemon.weight / 10}kg</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Base XP</StatLabel>
              <StatValue>{pokemon.base_experience}</StatValue>
            </StatCard>
          </StatsGrid>

          <Section>
            <SectionTitle>Moves</SectionTitle>
            <MovesGrid>
              {pokemon.moves && pokemon.moves.slice(0, 8).map(move => (
                <MoveChip key={move.move.name}>{move.move.name}</MoveChip>
              ))}
            </MovesGrid>
          </Section>

          <Section>
            <SectionTitle>Abilities</SectionTitle>
            <Abilities pokemon={pokemon} />
          </Section>
        </PokedexBottom>
      </PokedexContainer>
    </Div>
  )



}

const openPokedex = keyframes`
  0% {
    transform: perspective(1000px) rotateX(-90deg);
    opacity: 0;
  }
  100% {
    transform: perspective(1000px) rotateX(0deg);
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`;

const shine = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe, #00f2fe, #43e97b);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
`;

const LoadingText = styled.p`
  font-size: 2rem;
  color: white;
  font-weight: bold;
`;

const Div = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe, #00f2fe, #43e97b);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  background-attachment: fixed;

  @media (max-width: 930px) {
    padding: 1rem;
  }
`;

const PokedexContainer = styled.div`
  max-width: 900px;
  width: 100%;
  animation: ${openPokedex} 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const PokedexTop = styled.div`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  border-radius: 30px 30px 0 0;
  padding: 2rem;
  position: relative;
  box-shadow: 0 -5px 30px rgba(0, 0, 0, 0.3),
              inset 0 -10px 30px rgba(0, 0, 0, 0.2);
  border: 5px solid #2c3e50;
  border-bottom: none;

  @media (max-width: 930px) {
    padding: 1.5rem;
  }
`;

const PokedexLid = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const LidCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #4fc3f7 0%, #0288d1 50%, #01579b 100%);
  border: 4px solid #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4),
              inset 0 -3px 10px rgba(0, 0, 0, 0.3),
              inset 3px 3px 10px rgba(255, 255, 255, 0.5);
  animation: ${shine} 2s ease-in-out infinite;
`;

const LidLight = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #ff5252;
  border: 2px solid #fff;
  box-shadow: 0 0 10px #ff5252;
`;

const PokemonImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  animation: ${float} 3s ease-in-out infinite;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(5deg);
  }

  @media (max-width: 930px) {
    width: 150px;
    height: 150px;
  }
`;

const H1 = styled.h1`
  font-size: 2.5rem;
  text-transform: capitalize;
  text-align: center;
  color: white;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
  font-family: 'Pokemon Hollow', sans-serif;
  letter-spacing: 3px;
  margin: 1rem 0;

  @media (max-width: 930px) {
    font-size: 2rem;
  }
`;

const TypesContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const TypeBadge = styled.span`
  padding: 0.5rem 1.5rem;
  background: ${props => props.typeColor || 'rgba(255, 255, 255, 0.3)'};
  backdrop-filter: blur(10px);
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const PokedexBottom = styled.div`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border-radius: 0 0 30px 30px;
  padding: 2rem;
  border: 5px solid #2c3e50;
  border-top: none;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  color: white;

  @media (max-width: 930px) {
    padding: 1.5rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #4fc3f7;
`;

const Section = styled.section`
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #4fc3f7;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
`;

const MovesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.8rem;
`;

const MoveChip = styled.div`
  padding: 0.8rem;
  background: rgba(79, 195, 247, 0.2);
  border: 2px solid rgba(79, 195, 247, 0.5);
  border-radius: 10px;
  text-align: center;
  text-transform: capitalize;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(79, 195, 247, 0.4);
    transform: scale(1.05);
  }
`;

const Button = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-5px);
  }

  &:active {
    transform: scale(0.95);
  }
`






export { PokemonDetails }