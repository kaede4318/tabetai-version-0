import mongoose from "mongoose";

import Recipe from "../models/recipe.model.js";
import RecipeDetail from "../models/recipeDetail.model.js";

export const getRecipes = async (req, res) => {
    try {
        // if find() has empty obj {}, this will fetch 
        //all of the obj in DB
        const recipes = await Recipe.find({});
        res.status(200).json({ success: true, data: recipes })
    } catch (error) {
        console.log("error in fetching recipes:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createRecipe = async (req, res) => {
    const recipe = req.body; // user will send this data
    
    // check if user input fields are valid
    if (!recipe.name || !recipe.price || !recipe.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newRecipe = new Recipe(recipe);

    try {
        await newRecipe.save();
        res.status(201).json({ success: true, data: newRecipe });
    } catch (error) {
        console.error("Error in creating new recipe: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateRecipe = async (req, res) => {
    const { id } = req.params;

    const recipe = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Recipe Id" });
    }

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, { new: true });
        res.status(200).json({ success: true, data: updatedRecipe });
    } catch (error) {
        console.log("error in updating recipe:", error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
};

export const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Recipe Id" });
    }

    try {
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Recipe deleted" });
    } catch (error) {
        console.log("error in deleting recipe:", error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
};