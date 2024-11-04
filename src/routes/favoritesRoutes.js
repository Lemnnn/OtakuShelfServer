const express = require("express");
const {
  addFavorite,
  getUserFavorites,
  deleteFavoriteManga,
} = require("../controllers/favoritesController");

const router = express.Router();

router.post("/add", addFavorite);
router.get("/:id", getUserFavorites);
router.delete("/remove/:id", deleteFavoriteManga);

module.exports = router;
