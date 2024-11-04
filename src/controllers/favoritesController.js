const supabase = require("../config/supabaseConfig");

const addFavorite = async (req, res) => {
  const { user_id, manga_id } = req.body;

  if (!user_id || !manga_id) {
    return res.status(400).json({ error: "User ID and Manga ID are required" });
  }

  try {
    const { data, error } = await supabase
      .from("Favorite Mangas")
      .upsert({ user_id: user_id, manga_id: manga_id })
      .select("id,manga_id")
      .limit(1)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: "Manga added to favorites!", data });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserFavorites = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const { data, error } = await supabase
      .from("Favorite Mangas")
      .select("id, manga_id")
      .eq("user_id", userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res
      .status(200)
      .json({ message: "This are your favorite mangas", data });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFavoriteManga = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "ID not provided" });
  }

  try {
    const { error } = await supabase
      .from("Favorite Mangas")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: "Manga removed from Favorites" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addFavorite,
  getUserFavorites,
  deleteFavoriteManga,
};
