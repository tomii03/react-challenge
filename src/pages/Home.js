import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import logoPokedex from "../images/LogoPokeDex.png";
import gifPokeball from "../images/pokeball.gif"; 
import gifCharmander from "../images/charmander.gif"; 
import "../styles/home.scss";

function Home() {
  const navigate = useNavigate();

  const goToPokeList = () => {
    navigate("/PokeList");
  };

  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={logoPokedex} alt="Pokédex Logo" className="pokedex-logo" />
      </div>
      <div className="button-container">
        <button className="button-85" onClick={goToPokeList}>
          Cargar Pokemons
        </button>
      </div>
      <div className="gifs-container">
        <img src={gifPokeball} alt="GIF 1" className="gif1" />
        <img src={gifCharmander} alt="GIF 2" className="gif2" />
      </div>
    </div>
  );
}

export default Home;
