const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.use(cookieParser());

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
