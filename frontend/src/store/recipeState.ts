import { create } from 'zustand';

type RecipeStore = {
    newRecipe: any;
    setNewRecipe: (field: keyof any, value: any) => void;
    newRecipeDetail: any;
    setNewRecipeDetail: (field: keyof any, value: any) => void;
};

const emptyRecipe = {
    name: "",
    author: "",
    rating: null,
    image: "",
    tags: [],
    detailId: null,
};

const emptyRecipeDetail = {
    servings: null,
    cookingTime: { total: null, prep: null, cook: null },
    ingredients: [],
    equipment: [],
    instructions: [],
    notes: [],
    link: "",
};

export const useRecipeStore = create<RecipeStore>((set) => ({
    newRecipe: emptyRecipe, // default newRecipe object

    setNewRecipe: (field, value) =>
        set((state) => ({
            newRecipe: {
                ...state.newRecipe,
                [field]: value, // Dynamically update the specified field
            },
        })),

    newRecipeDetail: emptyRecipeDetail,

    setNewRecipeDetail: (field, value) =>
        set((state) => ({
            newRecipeDetail: {
                ...state.newRecipeDetail,
                [field]: value, // Dynamically update the specified field
            },
        })),
}));
