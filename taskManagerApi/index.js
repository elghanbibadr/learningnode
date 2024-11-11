const express = require("express");
const mongoose = require("mongoose");
const app = express();
const register = require("./routes/register");
const login = require("./routes/login");
const tasks = require("./routes/tasks");

const { connectDB } = require("./db/db");
const config = require("config");

// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL ERROR:jwt not defined");
//   process.exit(1);
// }

app.use(express.json());

connectDB();

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/tasks", tasks);


app.listen(3000, () => console.log(`Server is running on port 3000`));
