import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";

import recipeRoutes from "./routes/recipe.route.js"

// TODO: Convert this file to TS

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // use default port of 5001 if PORT not set in env

// middleware that allows us to accept json data in req.body
app.use(express.json());

app.use("/api/recipes", recipeRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});