import express from "express";
import { createRecipe, getRecipes, updateRecipe, deleteRecipe, getRecipe } from '../controllers/recipe.controller.js';

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", createRecipe);
// use put for updating all the fields and use patch for updating some fields
router.put("/:id", updateRecipe);
// :id means the id is dynamic and can depend on what value the user passes
router.delete("/:id", deleteRecipe);

export default router;