import mongoose from 'mongoose';

// TODO: Convert this file to TS

const tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: false,
        index: 1
    }
})

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: 1
    },
    author: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false,
        index: -1
    },
    image: {
        type: String,
        required: false
    },
    tags: [tagSchema],
    detailId: {
        type: mongoose.Schema.Types.ObjectId
    }, // reference to RecipeDetail
}, {
    timestamps: true // createdAt, updatedAt
});

const Recipe = mongoose.model('Recipe', recipeSchema); // use singular, capitalized version of noun

export default Recipe;