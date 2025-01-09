import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useRecipeStore } from "../store/recipe";
import type { Recipe } from "../store/recipe";

const RecipePage = () => {
    const { id } = useParams<{ id: string }>(); 

    const fetchRecipe = useRecipeStore((state) => state.fetchRecipe);

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        // Ensure ID exists
        if (!id) {
            throw new Error("ID doesn't exist!");
        }
        
        // define loadRecipe function
        const loadRecipe = async () => {
            try {
                setLoading(true);
                const fetchedRecipe = await fetchRecipe(id);
                if (fetchedRecipe) {
                    setRecipe(fetchedRecipe);
                } else {
                    setError("Product not found");
                }
            } catch (error) {
                setError("Failed to fetch product details");
            } finally {
                setLoading(false);
            }
        };

        loadRecipe(); // calls the above function
    }, [id, fetchRecipe]);
  
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!recipe) {
      return <div>No recipe found.</div>;
    }
  
    return (
      <div>
        POOP
        {/* <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: {product.price}</p> */}
      </div>
    );
}

export default RecipePage;