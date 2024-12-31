import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true // createdAt, updatedAt
});

const Recipe = mongoose.model('Recipe', recipeSchema);
// use singular, capitalized version of noun

export default Recipe;