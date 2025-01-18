import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useRecipeStore } from "../store/apiStore";

import { Image, Badge, Group, Checkbox, Stack, List, Anchor, Title, Box, AppShell, Card, Text, Grid, ScrollArea } from "@mantine/core";
import { FiExternalLink } from 'react-icons/fi';
import { useMediaQuery } from '@mantine/hooks';


const RecipePage = () => {
    const { id } = useParams<{ id: string }>(); 

    const fetchRecipe = useRecipeStore((state) => state.fetchRecipe);

    const [recipe, setRecipe] = useState<any | null>(null); // change type? (don't use any?)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // const isMobile = useMediaQuery('(theme.breakpoints: "sm")'); // detects if mobile content
  
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
        <Box>
            <Box mr={450}>
                <Card
                    shadow="sm"
                    padding="lg"
                    style={{
                        backgroundColor: "#f8f9fa", // Light gray background
                        borderRadius: "8px",
                    }}
                >
                    <Title order={3} mb="sm">
                        Recipe Details
                    </Title>
                    <Text size="md" style={{ marginBottom: "16px" }}>
                        {detailInfo.servings !== null ? `Serves ${detailInfo.servings}` : "Unknown servings"}
                    </Text>
                    <Grid justify="center" align="center">
                        <Grid.Col span={4}>
                            <Text fw={700} align="left">
                                Total Time
                            </Text>
                            {detailInfo.cookingTime.total !== null ? `${detailInfo.cookingTime.total} mins` : "? mins"}
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Text fw={700} align="left">
                                Prep Time
                            </Text>
                            {detailInfo.cookingTime.prep !== null ? `${detailInfo.cookingTime.prep} mins` : "? mins"}
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Text fw={700} align="left">
                                Cook Time
                            </Text>
                            {detailInfo.cookingTime.cook !== null ? `${detailInfo.cookingTime.cook} mins` : "? mins"}
                        </Grid.Col>
                    </Grid>
                </Card>

                <Title mt="xl" mb="md" order={2}>Ingredients</Title>
                <Stack>
                    {detailInfo.ingredients.map((ing: any) => (
                        <Checkbox
                            label={ing.ingredient}
                        />
                    ))}
                </Stack>

                <Title mt="xl" mb="md" order={2}>Method</Title>
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

                { detailInfo.notes.length > 0 && (
                    <>
                        <Title mt="xl" mb="md" order={2}>Notes</Title>
                        <List>
                            {detailInfo.notes.map((note: any) => (
                                <List.Item>{note.note}</List.Item>
                            ))}
                        </List>
                    </>
                )}

                { detailInfo.equipment.length > 0 && (
                    <>
                        <Title mt="xl" mb="md" order={2}>Equipment</Title>
                        <List>
                            {detailInfo.equipment.map((e: any) => (
                                <List.Item>{e.name}</List.Item>
                            ))}
                        </List>
                    </>
                )}
            </Box>
            
            {/* bar that appears on the right of the main content */}
            {/* disable this if the browser is on mobile */}

            <AppShell.Aside p={35} w={500}>
            {/* <ScrollArea h="100vh" type="never" scrollbars="y" scrollHideDelay={0}> */}
                <Anchor href={`/update/${id}`} target="_blank">
                    Anchor component
                </Anchor>
                <Title order={2}>{basicInfo.name}</Title>
                <Group
                    gap="xl"
                    mb={30}
                >
                    { basicInfo.author !== "" && (
                        <Title order={4}>By {basicInfo.author}</Title>
                    )}
                    { detailInfo.link !== "" && (
                        <Anchor href={detailInfo.link} target="_blank">
                            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                Recipe Source
                                <FiExternalLink style={{ marginLeft: '4px' }} />
                            </span>
                        </Anchor>
                    )}
                </Group>
                <Image 
                    radius="md"
                    h={350}
                    w="auto"
                    fit="contain"
                    src={basicInfo.image}
                    fallbackSrc={"https://placehold.co/600x400?text=Image+not+found+:("}
                />
                <Group gap="xs" mt="xs">
                    {basicInfo.tags.map((tag: any) => (
                        <Badge color="#10bcfc">{tag.tag}</Badge>
                    ))}
                </Group>
                {/* </ScrollArea> */}
            </AppShell.Aside>
        </Box>
    );
}

export default RecipePage;