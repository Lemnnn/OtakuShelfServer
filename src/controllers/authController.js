const supabase = require("../config/supabaseConfig");

const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: "Signup successful", data });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const sessionToken = data.session?.access_token;

    if (!sessionToken) {
      return res
        .status(400)
        .json({ error: "Login failed. No session token found." });
    }

    res.cookie("session_token", sessionToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json({ message: "Login successful", success: true });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signUpUser,
  loginUser,
};
