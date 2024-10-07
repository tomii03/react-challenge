const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const favoritesFilePath = path.join(__dirname, "favorites.json");

if (!fs.existsSync(favoritesFilePath)) {
  fs.writeFileSync(favoritesFilePath, JSON.stringify([]));
}

// Ruta GET para obtener los favoritos
app.get("/favorites", (req, res) => {
  fs.readFile(favoritesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error al leer el archivo" });
    }
    res.json(JSON.parse(data));
  });
});

// Ruta POST para agregar un favorito
app.post("/favorites", (req, res) => {
  const { pokemon_name, pokemon_url } = req.body;

  fs.readFile(favoritesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error al leer el archivo" });
    }
    const favorites = JSON.parse(data);

    const newFavorite = { id: Date.now(), pokemon_name, pokemon_url };
    favorites.push(newFavorite);

    fs.writeFile(favoritesFilePath, JSON.stringify(favorites), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error al escribir el archivo" });
      }
      res.status(201).json(newFavorite);
    });
  });
});

// Ruta DELETE para eliminar un favorito
app.delete("/favorites/delete", (req, res) => {
  const { pokemon_name } = req.params;
  console.log(`Intentando eliminar favorito: ${pokemon_name}`); // Log para depuración
  
  fs.readFile(favoritesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error al leer el archivo" });
    }

    let favorites = JSON.parse(data);
    const favoriteIndex = favorites.findIndex(fav => fav.pokemon_name && fav.pokemon_name === pokemon_name); // Comparación de nombres

   
    if (favoriteIndex === -1) {
      return res.status(404).json({ message: `Pokémon ${pokemon_name} no encontrado en favoritos` });
    }

    favorites.splice(favoriteIndex, 1);

    
    fs.writeFile(favoritesFilePath, JSON.stringify(favorites), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error al escribir el archivo" });
      }
      res.status(200).json({ message: "Favorito eliminado correctamente" });
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
