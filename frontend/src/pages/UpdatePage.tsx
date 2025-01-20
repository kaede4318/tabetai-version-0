import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "../store/apiStore";
import {
    Box,
    Button,
    Fieldset,
    Group,
    Modal,
    MultiSelect,
    NumberInput,
    TextInput,
    Title,
} from "@mantine/core";
import { notifications } from '@mantine/notifications';
import ListInput from "../components/ListInput";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

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

const UpdatePage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the recipe ID from the URL

    const [recipe, setRecipe] = useState<any>(emptyRecipe);
    const [recipeDetail, setRecipeDetail] = useState<any>(emptyRecipeDetail);
    const [originalRecipe, setOriginalRecipe] = useState<any>(emptyRecipe);
    const [originalRecipeDetail, setOriginalRecipeDetail] = useState<any>(emptyRecipeDetail);

    const [modalOpened, setModalOpened] = useState(false);

    const { fetchRecipe, updateRecipe, deleteRecipe } = useRecipeStore();

    const navigate = useNavigate(); // React Router's navigation hook

    const recipeTags = [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Dessert",
        "Appetizer",
        "Main Course",
        "Side Dish",
        "Easy",
        "Quick",
        "Healthy",
        "Vegetarian",
        "Vegan",
        "Gluten-Free",
        "Dairy-Free",
        "Low-Carb",
        "High-Protein",
        "Mexican",
        "Italian",
        "Japanese",
        "Chinese",
        "Indian",
        "Mediterranean",
        "Thai",
        "American",
        "French",
        "Korean",
        "BBQ",
        "Comfort Food",
        "Holiday",
        "Seasonal",
        "One-Pot",
        "Slow Cooker",
        "Instant Pot",
        "Grilled",
        "Baked",
        "Fried",
        "Soup",
        "Salad",
        "Pasta",
        "Seafood",
        "Chicken",
        "Beef",
        "Pork",
        "Vegetable",
        "Spicy",
        "Sweet",
        "Savory"
    ].map((tag) => ({ value: tag, label: tag })); // convert tags to correct Type (ComboboxItem)

    useEffect(() => {
        const fetchRecipeData = async () => {
            // Ensure ID exists
            if (!id) {
                throw new Error("ID doesn't exist!");
            }

            const recipeData = await fetchRecipe(id);
            if (recipeData) {
                setRecipe(recipeData.recipe);
                setRecipeDetail(recipeData.recipeDetail);
                setOriginalRecipe(recipeData.recipe);
                setOriginalRecipeDetail(recipeData.recipeDetail);
            } else {
                notifications.show({
                    title: "Error",
                    message: "Error fetching recipe data.",
                    color: "red",
                    position: 'bottom-center',
                    icon: <FaXmark />
                });
            }
        };

        fetchRecipeData();
    }, [id, fetchRecipe]);

    const getChangedFields = (original: any, updated: any) => {
        const changes: any = {};
        Object.keys(updated).forEach((key) => {
            if (JSON.stringify(original[key]) !== JSON.stringify(updated[key])) {
                changes[key] = updated[key];
            }
        });
        return changes;
    };

    const handleUpdateRecipe = async () => {
        const updatedRecipeData = getChangedFields(originalRecipe, recipe);
        const updatedRecipeDetailData = getChangedFields(originalRecipeDetail, recipeDetail);

        const payload: any = {};
        if (Object.keys(updatedRecipeData).length > 0) {
            payload.recipeData = updatedRecipeData;
        }
        if (Object.keys(updatedRecipeDetailData).length > 0) {
            payload.detailedRecipeData = updatedRecipeDetailData;
        }

        // Ensure ID exists
        if (!id) {
            throw new Error("ID doesn't exist!");
        }

        const { success, message } = await updateRecipe(id, payload);

        if (success) {
            notifications.show({
                title: "Recipe Updated",
                message: message || "Your recipe was successfully updated!",
                color: "green",
                position: 'bottom-center',
                icon: <FaCheck />
            });
        } else {
            notifications.show({
                title: "Error",
                message: message || "There was an error updating your recipe.",
                color: "red",
                position: 'bottom-center',
                icon: <FaXmark />
            });
        }
    };

    const handleDeleteRecipe = async () => {
        // Ensure ID exists
        if (!id) {
            throw new Error("ID doesn't exist!");
        }

        const { success, message } = await deleteRecipe(id);

        if (success) {
            notifications.show({
                title: "Recipe Deleted",
                message: message || "Your recipe was successfully deleted!",
                color: "green",
                position: 'bottom-center',
                icon: <FaCheck />
            });
            navigate("/");
        } else {
            notifications.show({
                title: "Error",
                message: message || "There was an error deleting your recipe.",
                color: "red",
                position: 'bottom-center',
                icon: <FaXmark />
            });
        }

        setModalOpened(false); // Close modal after handling
    }

    const updateList = (field: string, property: string, index: number, value: string) => {
        const updatedList = [...recipeDetail[field]];
        updatedList[index] = { [property]: value };
        setRecipeDetail({ ...recipeDetail, [field]: updatedList });
    };

    const addToList = (field: string, property: string) => {
        setRecipeDetail({
            ...recipeDetail,
            [field]: [...recipeDetail[field], { [property]: "" }],
        });
    };

    const removeFromList = (field: string, index: number) => {
        const updatedList = recipeDetail[field].filter((_: any, i: number) => i !== index);
        setRecipeDetail({ ...recipeDetail, [field]: updatedList });
    };

    const basicInfo = recipe;
    const detailInfo = recipeDetail;

    return (
        <Box>
            <Title>Update Recipe</Title>
            <Fieldset legend="Overview" mt="md">
                <TextInput
                    label="Recipe Name"
                    placeholder="My Recipe"
                    value={basicInfo.name}
                    onChange={(e) =>
                        setRecipe({ ...basicInfo, name: e.currentTarget.value })
                    }
                />
                <TextInput
                    label="Recipe Author"
                    placeholder="Me"
                    mt="md"
                    value={basicInfo.author}
                    onChange={(e) =>
                        setRecipe({ ...basicInfo, author: e.currentTarget.value })
                    }
                />
                <NumberInput
                    label="Rating"
                    placeholder="5"
                    mt="md"
                    value={basicInfo.rating}
                    onChange={(value) =>
                        setRecipe({ ...basicInfo, rating: value })
                    }
                    min={0}
                    max={5}
                />
                <MultiSelect
                    label="Tags"
                    placeholder="Add tags"
                    mt="md"
                    data={recipeTags}
                    value={basicInfo.tags.map((tag: any) => tag.tag)}
                    onChange={(value) =>
                        setRecipe({ ...basicInfo, tags: value.map((tag) => ({ tag })) })
                    }
                    searchable
                />
                <TextInput
                    label="Recipe Picture"
                    placeholder="Please provide a link"
                    mt="md"
                    value={basicInfo.image}
                    onChange={(e) =>
                        setRecipe({ ...basicInfo, image: e.currentTarget.value })
                    }
                />
                <NumberInput
                    label="Servings"
                    placeholder="2"
                    mt="md"
                    value={detailInfo.servings}
                    onChange={(value) =>
                        setRecipeDetail({ ...detailInfo, servings: value })
                    }
                />
                <Group mt="md" grow>
                    <NumberInput
                        label="Total Time (minutes)"
                        placeholder="15"
                        value={detailInfo.cookingTime.total}
                        onChange={(value) =>
                            setRecipeDetail({
                                ...detailInfo,
                                cookingTime: { ...detailInfo.cookingTime, total: value },
                            })
                        }
                    />
                    <NumberInput
                        label="Prep Time (minutes)"
                        placeholder="5"
                        value={detailInfo.cookingTime.prep}
                        onChange={(value) =>
                            setRecipeDetail({
                                ...detailInfo,
                                cookingTime: { ...detailInfo.cookingTime, prep: value },
                            })
                        }
                    />
                    <NumberInput
                        label="Cook Time (minutes)"
                        placeholder="10"
                        value={detailInfo.cookingTime.cook}
                        onChange={(value) =>
                            setRecipeDetail({
                                ...detailInfo,
                                cookingTime: { ...detailInfo.cookingTime, cook: value },
                            })
                        }
                    />
                </Group>
            </Fieldset>

            <Fieldset legend="Details" mt="md">
                <ListInput
                    title="Ingredients"
                    items={detailInfo.ingredients}
                    onChange={(index, value) => updateList("ingredients", "ingredient", index, value)}
                    onAdd={() => addToList("ingredients", "ingredient")}
                    onDelete={(index) => removeFromList("ingredients", index)}
                />
                <ListInput
                    title="Instructions"
                    items={detailInfo.instructions}
                    onChange={(index, value) => updateList("instructions", "instruction", index, value)}
                    onAdd={() => addToList("instructions", "instruction")}
                    onDelete={(index) => removeFromList("instructions", index)}
                />
                <ListInput
                    title="Equipment"
                    items={detailInfo.equipment}
                    onChange={(index, value) => updateList("equipment", "name", index, value)}
                    onAdd={() => addToList("equipment", "name")}
                    onDelete={(index) => removeFromList("equipment", index)}
                />
                <ListInput
                    title="Notes"
                    items={detailInfo.notes}
                    onChange={(index, value) => updateList("notes", "note", index, value)}
                    onAdd={() => addToList("notes", "note")}
                    onDelete={(index) => removeFromList("notes", index)}
                />
            </Fieldset>
            
            <Group mt="xl">
                <Button onClick={handleUpdateRecipe}>
                    Update Recipe
                </Button>
                <Button variant="filled" color="red" onClick={() => setModalOpened(true)}>
                    Delete Recipe
                </Button>
            </Group>

            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title="Confirm Delete"
                centered
            >
                <p>Are you sure you want to delete this recipe? This action is irreversible!</p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Button variant="outline" onClick={() => setModalOpened(false)}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={handleDeleteRecipe}>
                        Confirm
                    </Button>
                </div>
            </Modal>

        </Box>
    );
};

export default UpdatePage;
