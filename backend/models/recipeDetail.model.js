import mongoose from "mongoose";

// TODO: Convert this file to TS

const recipeDetailSchema = new mongoose.Schema({
    servings: {
        type: Number,
        required: false // change to true?
    },
    cookingTime: {
        total: { type: Number, required: false },
        prep: { type: Number, required: false },
        cook: { type: Number, required: false }
    },
    ingredients: [{ 
        ingredient: { type: String, required: true }
    }],
    equipment: [{ 
        name: { type: String, required: false }
    }],
    instructions: [{
        instruction: { type: String, required: true },
        pictureLink: { type: String, required: false } // recipes sometimes have multiple pictures per instruction
    }],
    notes: [{
        note: { type: String, required: false }
    }],
    link: { type: String }
}, {
    timestamps: true // createdAt, updatedAt
});

const RecipeDetail = mongoose.model('RecipeDetail', recipeDetailSchema);

export default RecipeDetail;