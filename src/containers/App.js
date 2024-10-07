import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PokemonList from "../pages/pokemonList/PokemonList";
import FavoriteList from "../pages/FavoriteList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PokeList" element={<PokemonList />} />
        <Route path="/FavoriteList" element={<FavoriteList />} />
      </Routes>
    </Router>
  );
};

export default App;
