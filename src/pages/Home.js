import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import logoPokedex from "../images/LogoPokeDex.png"
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
        <Button onClick={goToPokeList}> Cargar Pokemons </Button>
      </div>
    </div>
  );
}

export default Home;
