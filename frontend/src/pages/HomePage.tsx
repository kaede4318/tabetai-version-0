import { Anchor, Box, Container, SimpleGrid, Stack, Title } from "@mantine/core";
import RecipeCard from "../components/RecipeCard";
import { useRecipeStore } from "../store/recipe";
import { useEffect, useState } from "react";

const HomePage = () => {
    // const [recipe, setRecipe] = useState<Recipe | null>(null); // change type? (don't use any?)
    const { fetchRecipes, recipes } = useRecipeStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                setLoading(true);
                fetchRecipes();
            } catch (error) {
                setError("Failed to fetch recipe details");
            } finally {
                setLoading(false);
            }
        };
        loadRecipes();

    }, [fetchRecipes]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!recipes) {
      return <div>No recipes found.</div>;
    }
    
    return (
        <Box>
            <Stack
                h="100%"
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="space-between"
            >
                <Title>Recipes</Title>
                
                <SimpleGrid 
                    cols={{ base: 1, sm: 2, lg: 3 }}
                    spacing={{ base: 10, sm: 'xl' }}
                    verticalSpacing={{ base: 'md', sm: 'xl' }}
                >
                    {recipes.map((r) => (
                        <div key={r._id}>
                            <Anchor
                                href={`/recipe/${r._id}`}
                                underline="never"
                            >
                                <RecipeCard recipe={r} />
                            </Anchor>
                        </div>
                    ))}
                </SimpleGrid>
            </Stack>
        </Box>
    );
}

export default HomePage