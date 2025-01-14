import mongoose from "mongoose";

// TODO: remove this! make ingredient a string with all of the info in it
const ingredientSchema = new mongoose.Schema({
    ingredient: {
        type: { 
            name: {
                type: String,
                required: true
            },
            amount: {
                qty: { type: Number, required: false },
                unit: { type: String, required: false }
            }
        },
        required: true
    }
});

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
    ingredients: [ingredientSchema],
    equipment: [{ 
        name: { type: String }
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