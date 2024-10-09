const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const favoritesFilePath = path.join(__dirname, "favorites.json");

if (!fs.existsSync(favoritesFilePath)) {
  fs.writeFileSync(favoritesFilePath, JSON.stringify([]));
}

//Generamos metodo get
app.get("/favorites", (req, res) => {
  fs.readFile(favoritesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error al leer el archivo" });
    }
    res.json(JSON.parse(data));
  });
});

//Generamos metodo post y guardamos name, id y url del pokemon
app.post("/favorites", (req, res) => {
  const { id, pokemon_name, pokemon_url } = req.body;

  fs.readFile(favoritesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error al leer el archivo" });
    }
    const favorites = JSON.parse(data);

    const newFavorite = { id , pokemon_name, pokemon_url };
    favorites.push(newFavorite);

    fs.writeFile(favoritesFilePath, JSON.stringify(favorites), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al escribir el archivo" });
      }
      res.status(201).json(newFavorite);
    });
  });
});

//Generamos metodo delete buscandolo por ID
app.delete("/favorites/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Intentando eliminar favorito: ${id}`);

  fs.readFile(favoritesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error al leer el archivo" });
    }

    const favorites = JSON.parse(data);

    const favoriteIndex = favorites.findIndex(
      (fav) => fav.id && fav.id === Number(id)
    );

    if (favoriteIndex === -1) {
      return res.status(404).json({
        message: `Pokémon con ID ${id} no encontrado en favoritos`,
      });
    }
    
    //Una vez encontrado el ID, hace una splice de la lista y graba nuevamente la lista sin el elemento a eliminar

    favorites.splice(favoriteIndex, 1);

    fs.writeFile(favoritesFilePath, JSON.stringify(favorites), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al escribir el archivo" });
      }
      res.status(200).json({ message: "Favorito eliminado correctamente" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
