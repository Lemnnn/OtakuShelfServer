const supabase = require("../config/supabaseConfig");

const tokenValidation = async (req, res, next) => {
  const token = req.cookies.session_token;

  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid token or user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = tokenValidation;
