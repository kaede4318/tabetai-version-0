import mongoose from "mongoose";

import Recipe from "../models/recipe.model.js";
import RecipeDetail from "../models/recipeDetail.model.js";

/**
 * getRecipes returns all recipes in the database
 */
export const getRecipes = async (req, res) => {
    try {
        // if find() has empty obj {}, this will fetch all of the obj in DB
        const recipes = await Recipe.find({});
        res.status(200).json({ success: true, data: recipes })
    } catch (error) {
        console.log("error in fetching recipes:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

/**
 * getRecipe returns a specific recipe based on ID
 */
export const getRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Recipe Id" });
    }

    try {
        const recipe = await Recipe.findById(id);
        const recipeDetail = await RecipeDetail.find(recipe.detailId);
        res.status(200).json({ success: true, recipeData: recipe, detailedRecipeData: recipeDetail })
    } catch (error) {
        console.log("error in fetching recipes:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

/**
 * createRecipe creates a new recipe
 */
export const createRecipe = async (req, res) => {
    const { recipeData, detailedRecipeData } = req.body; // user will send this data

    // check if user input fields are valid
    if (!recipeData || !recipeData.name) {
        return res.status(400).json({ success: false, message: "Please provide all fields to recipe" });
    }

    if (!detailedRecipeData || detailedRecipeData.ingredients.length === 0 || detailedRecipeData.instructions.length === 0) {
        return res.status(400).json({ success: false, message: "Please provide ingredients and/or instructions to recipe"});
    }

    try {
        const recipeDetail = new RecipeDetail(detailedRecipeData);
        const savedRecipeDetail = await recipeDetail.save();

        // Create Recipe document with reference to RecipeDetail
        const recipe = new Recipe({
            ...recipeData,
            detailId: savedRecipeDetail._id, // Reference to RecipeDetail
        });
        const savedRecipe = await recipe.save();

        res.status(201).json({
            message: 'Recipe and RecipeDetail created successfully',
            recipe: savedRecipe,
            recipeDetail: savedRecipeDetail,
        });
    } catch (error) {
        console.error("Error in creating new recipe: ", error.message);
        res.status(500).json({ success: false, message: "Server Error " + error});
        // note: if you find a 500 error here, first check if the type is wrong
    }
};

/**
 * updateRecipe updates a recipe's data
 */
export const updateRecipe = async (req, res) => {
    const { id } = req.params;

    const { recipeData, detailedRecipeData } = req.body; // user will send this data

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Recipe Id" });
    }

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipeData, { new: true });
        const updatedRecipeDetail = await RecipeDetail.findByIdAndUpdate(updatedRecipe.detailId, detailedRecipeData, { new: true })
        res.status(200).json({ success: true, data: updatedRecipe, dataDetailed: updatedRecipeDetail });
    } catch (error) {
        console.log("error in updating recipe:", error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
};

/**
 * deleteRecipe removes a recipe permanently from the database
 */
export const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Recipe Id" });
    }

    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        await RecipeDetail.findByIdAndDelete(deletedRecipe.detailId); // remove corresponding recipe detail object
        res.status(200).json({ success: true, message: "Successfully deleted recipe: " + deletedRecipe.name });
    } catch (error) {
        console.log("error in deleting recipe:", error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
};