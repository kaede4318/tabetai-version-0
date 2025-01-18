import { create } from "zustand";
import { Types } from "mongoose";

// define types for state and actions
interface ApiResponse {
    success: boolean;
    message: string;
}

export interface Recipe {
	_id: string; // MongoDB ObjectId as a string
	name: string;
	author: string;
	rating: number;
	image: string;
	tags: string[];
	detailId: Types.ObjectId;
}

export interface RecipeStore {
	recipes: Recipe[];
	setRecipes: (recipes: Recipe[]) => void;
	// createRecipe: (newRecipe: Omit<Recipe, "_id" | "detailId">) => Promise<ApiResponse>; // do we need Omit type?
	createRecipe: (newRecipe: any) => Promise<ApiResponse>;
	fetchRecipes: () => Promise<ApiResponse>;
	fetchRecipe: (rid: string) => Promise<Recipe | ApiResponse>;
	deleteRecipe: (rid: string) => Promise<ApiResponse>;
	updateRecipe: (rid: string, updatedRecipe: Partial<Recipe>) => Promise<ApiResponse>;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
	recipes: [],

	setRecipes: (recipes) => set({ recipes }),

	createRecipe: async (newRecipe): Promise<ApiResponse> => {
		try {
			const res = await fetch("/api/recipes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newRecipe),
			});
	
			const data = await res.json();
			if (!data.success) {
				throw new Error(data.message);
			}
	
			set((state) => ({ recipes: [...state.recipes, data.data] }));
	
			return { success: true, message: "Recipe created successfully" };
		} catch (error) {
			return { success: false, message: (error as Error).message };
		}
	},

	fetchRecipes: async (): Promise<ApiResponse> => {
		try {
			const res = await fetch("/api/recipes");
			const data = await res.json();
	  
			if (!data.success) {
				throw new Error(data.message);
			}
	  
			set({ recipes: data.data });

            return { success: true, message: "Recipe fetched successfully" };
		} catch (error) {
			console.error("Error fetching recipes:", (error as Error).message);
            return { success: false, message: (error as Error).message };
		}
	},

	fetchRecipe: async (rid): Promise<any | ApiResponse> => {
		try {
			const res = await fetch(`/api/recipes/${rid}`);
			const data = await res.json();
	  
			if (!data.success) {
				throw new Error(data.message);
			}
	  
			return data.recipeData; // return single recipe by id
		} catch (error) {
			console.error("Error fetching recipe:", (error as Error).message);
			return { success: false, message: (error as Error).message };
		}
	},

	deleteRecipe: async (rid): Promise<ApiResponse> => {
	    try {
			const res = await fetch(`/api/recipes/${rid}`, {
				method: "DELETE",
			});
	  
			const data = await res.json();
			if (!data.success) {
				throw new Error(data.message);
			}
	  
			// update the ui immediately, without needing a refresh
			set((state) => ({
				recipes: state.recipes.filter((recipe) => recipe._id !== rid),
			}));
	  
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: (error as Error).message };
		}
	},

	updateRecipe: async (rid, updatedRecipe): Promise<ApiResponse> => {
		try {
			const res = await fetch(`/api/recipes/${rid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
			  	},
				body: JSON.stringify(updatedRecipe),
			});
	  
			const data = await res.json();
			if (!data.success) {
				throw new Error(data.message);
			}
	  
			set((state) => ({
				recipes: state.recipes.map((recipe) =>
					recipe._id === rid ? data.data : recipe
				),
			}));
	  
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: (error as Error).message };
		}
	},
}));