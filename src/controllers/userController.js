const getUserData = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUserData,
};
