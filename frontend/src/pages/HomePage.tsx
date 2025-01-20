import { Anchor, Box, SimpleGrid, Stack, Title, Text, Flex } from "@mantine/core";
import RecipeCard from "../components/RecipeCard";
import { useRecipeStore } from "../store/apiStore";
import { useEffect, useState } from "react";

const HomePage = () => {
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

                {recipes.length === 0 && (
                    <Flex
                        justify="center"
                        gap="md"
                    >
                        <Text>
                            No recipes found 😔
                        </Text>
                        <Anchor href={"/create"}>
                            Click here to create your new recipe!
                        </Anchor>
                    </Flex>
                )}
            </Stack>
        </Box>
    );
}

export default HomePage