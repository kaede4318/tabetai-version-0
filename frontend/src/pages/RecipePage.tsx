import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useRecipeStore } from "../store/recipe";
// import type { Recipe, RecipeStore } from "../store/recipe"; // how tf do you combine types

import { Container, Image, Badge, Group, Space, Checkbox, Stack, List, Anchor } from "@mantine/core";
import { FiExternalLink } from 'react-icons/fi';

// forms the ingredient string for ingredients section
const getIngredientString = (ingredient: any): string => {
    console.log(ingredient)
    if (!ingredient.ingredient.amount || !ingredient.ingredient.amount.qty) {
        return `${ingredient.ingredient.name}`;
    } else if (!ingredient.ingredient.amount.unit) {
        return `${ingredient.ingredient.amount.qty} ${ingredient.ingredient.name}`;
    } else {
        return `${ingredient.ingredient.amount.qty} ${ingredient.ingredient.amount.unit} ${ingredient.ingredient.name}`;
    }
};

const RecipePage = () => {
    const { id } = useParams<{ id: string }>(); 

    const fetchRecipe = useRecipeStore((state) => state.fetchRecipe);

    const [recipe, setRecipe] = useState<any | null>(null); // change type? (don't use any?)
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
                    setError("Recipe not found");
                }
            } catch (error) {
                setError("Failed to fetch recipe details");
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
  
    const basicInfo = recipe.recipe;
    const detailInfo = recipe.recipeDetail;

    return (
      <Container>
        <h1>{basicInfo.name}</h1>
        <Anchor href={detailInfo.link} target="_blank">
            Recipe Source <FiExternalLink />
        </Anchor>
        <h3>By {basicInfo.author}</h3>
        <p>Serves {detailInfo.servings}, Ready in {detailInfo.cookingTime.total} minutes</p>
        <Group>
            {basicInfo.tags.map((tag: string) => (
                <Badge>{tag.tag}</Badge>
            ))}
        </Group>
        <Space h="md" />
        <Image 
            radius="md"
            src={basicInfo.image}
            fallbackSrc={"https://placehold.co/600x400?text=Image+not+found+:("}
        />
        <Space h="md" />

        <h2>Ingredients</h2>
        <Stack>
            {detailInfo.ingredients.map((ing: any) => (
                <Checkbox
                    label={getIngredientString(ing)}
                />
            ))}
        </Stack>
        <Space h="md" />

        <h2>Method</h2>
        <List>
            {detailInfo.instructions.map((ins: any) => (
                <div>
                    <List.Item>{ins.instruction}</List.Item>
                    {/* recipe sometimes has multiple pictures per step (see recipeDetail.model.js as well) */}
                    {ins.pictureLink && (
                        <Image src={ins.pictureLink} alt="Instruction" />
                    )}
                </div>
            ))}
        </List>

        <h2>Notes</h2>
        <List>
            {detailInfo.notes.map((note: string) => (
                <List.Item>{note.note}</List.Item>
            ))}
        </List>

      </Container>
    );
}

export default RecipePage;