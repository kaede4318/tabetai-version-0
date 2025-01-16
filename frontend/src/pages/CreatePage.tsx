import { useState } from "react";
import { useRecipeStore } from "../store/apiStore";
import {
    Anchor,
    Box,
    Button,
    Fieldset,
    FileInput,
    Group,
    MultiSelect,
    NumberInput,
    Stack,
    TextInput,
    Title,
} from "@mantine/core";
import { notifications, showNotification } from '@mantine/notifications';
import ListInput from "../components/ListInput";

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

const CreatePage: React.FC = () => {
    const [newRecipe, setNewRecipe] = useState<any>(emptyRecipe);
    const [newRecipeDetail, setNewRecipeDetail] = useState<any>(emptyRecipeDetail);

    const { createRecipe } = useRecipeStore();

    const handleAddRecipe = async () => {
        const newRecipeData = {
        recipeData: newRecipe,
        detailedRecipeData: newRecipeDetail,
        };

        const { success, message } = await createRecipe(newRecipeData);

        // IGNORE FOR NOW: Add status toast here
        if (success) {
            notifications.show({
                title: "Recipe Created",
                message: message || "Your recipe was successfully created!",
                color: "green",
                // icon: <Check size={16} />,
            });
            setNewRecipe(emptyRecipe);
            setNewRecipeDetail(emptyRecipeDetail);
        } else {
            notifications.show({
                title: "Error",
                message: message || "There was an error creating your recipe.",
                color: "red",
                // icon: <X size={16} />,
            });
            console.error(message);
        }
    };

    /**
     * Updates a specific property of an item in a list within the `newRecipeDetail` state.
     *
     * @param {string} field - The name of the field in `newRecipeDetail` to update (e.g., "ingredients", "instructions").
     * @param {string} property - The property of the list item to update (e.g., "ingredient", "instruction").
     * @param {number} index - The index of the item in the list to update.
     * @param {string} value - The new value to set for the specified property.
     */
    const updateList = (field: string, property: string, index: number, value: string) => {
        const updatedList = [...newRecipeDetail[field]];
        updatedList[index] = { [property]: value };
        setNewRecipeDetail({ ...newRecipeDetail, [field]: updatedList });
    };
    
    /**
     * Adds a new item to a list within the `newRecipeDetail` state with an empty property value.
     *
     * @param {string} field - The name of the field in `newRecipeDetail` to update (e.g., "ingredients", "instructions").
     * @param {string} property - The property of the new list item to initialize with an empty string.
     */
    const addToList = (field: string, property: string) => {
        setNewRecipeDetail({
          ...newRecipeDetail,
          [field]: [...newRecipeDetail[field], { [property]: "" }],
        });
        
    };

    /**
     * Removes an item from a list within the `newRecipeDetail` state at a specified index.
     *
     * @param {string} field - The name of the field in `newRecipeDetail` to update (e.g., "ingredients", "instructions").
     * @param {string} property - The property of the list item (not directly used but included for symmetry with other functions).
     * @param {number} index - The index of the item in the list to remove.
     */
    const removeFromList = (field: string, property: string, index: number) => {
        const updatedList = newRecipeDetail[field].filter((_: any, i: number) => i !== index);
        setNewRecipeDetail({ ...newRecipeDetail, [field]: updatedList });
    };

    return (
        <Box>
        <Fieldset legend="Basic Info">
            <TextInput
                label="Recipe Name"
                placeholder="My Recipe"
                value={newRecipe.name}
                onChange={(e) =>
                    setNewRecipe({ ...newRecipe, name: e.currentTarget.value })
                }
            />
            {/* <TextInput
                label="Recipe Author"
                placeholder="Me"
                mt="md"
                value={newRecipe.author}
                onChange={(e) =>
                    setNewRecipe({ ...newRecipe, author: e.currentTarget.value })
                }
            />
            <NumberInput
                label="Rating"
                placeholder="5"
                mt="md"
                value={newRecipe.rating}
                onChange={(value) =>
                    setNewRecipe({ ...newRecipe, rating: value })
                }
                min={0}
                max={5}
            />
            <MultiSelect
                label="Tags"
                placeholder="Add tags"
                mt="md"
                data={["Mexican", "Easy", "Chicken"]}
                value={newRecipe.tags.map((tag: any) => tag.tag)}
                onChange={(value) =>
                    setNewRecipe({ ...newRecipe, tags: value.map((tag) => ({ tag })) })
                }
                searchable
            />
            <FileInput
                label="Recipe Picture"
                placeholder="Upload an image"
                mt="md"
                accept="image/*"
                onChange={(file) => setNewRecipe({ ...newRecipe, image: file })}
            /> */}
        </Fieldset>

        <Fieldset legend="Details">
            {/* <NumberInput
                label="Servings"
                placeholder="2"
                mt="md"
                value={newRecipeDetail.servings}
                onChange={(value) =>
                    setNewRecipeDetail({ ...newRecipeDetail, servings: value })
                }
            />
            <Group mt="md" grow>
            <NumberInput
                label="Total Time (minutes)"
                placeholder="15"
                value={newRecipeDetail.cookingTime.total}
                onChange={(value) =>
                    setNewRecipeDetail({
                        ...newRecipeDetail,
                        cookingTime: { ...newRecipeDetail.cookingTime, total: value },
                    })
                }
            />
            <NumberInput
                label="Prep Time (minutes)"
                placeholder="5"
                value={newRecipeDetail.cookingTime.prep}
                onChange={(value) =>
                    setNewRecipeDetail({
                        ...newRecipeDetail,
                        cookingTime: { ...newRecipeDetail.cookingTime, prep: value },
                    })
                }
            />
            <NumberInput
                label="Cook Time (minutes)"
                placeholder="10"
                value={newRecipeDetail.cookingTime.cook}
                onChange={(value) =>
                    setNewRecipeDetail({
                        ...newRecipeDetail,
                        cookingTime: { ...newRecipeDetail.cookingTime, cook: value },
                    })
                }
            />
            </Group> */}

            {/* <Stack mt="md">
                <Title order={5}>Ingredients</Title>
                {newRecipeDetail.ingredients.map((ingredient: any, index: number) => (
                    <TextInput
                        key={index}
                        placeholder="Ingredient"
                        value={ingredient.ingredient.name}
                        onChange={(e) =>
                            handleIngredientChange(index, e.currentTarget.value)
                        }
                    />
                ))}
                <Button variant="light" onClick={addNewIngredient}>
                    + Add Ingredient
                </Button>
            </Stack>

            <Stack mt="md">
                <Title order={5}>Instructions</Title>
                {newRecipeDetail.instructions.map((instruction: any, index: number) => (
                    <TextInput
                        key={index}
                        placeholder="Instruction"
                        value={instruction.instruction}
                        onChange={(e) =>
                            handleInstructionChange(index, e.currentTarget.value)
                        }
                    />
                ))}
                <Button variant="light" onClick={addNewInstruction}>
                    + Add Instruction
                </Button>
            </Stack>

            <Stack mt="md">
                <Title order={5}>Notes</Title>
                {newRecipeDetail.notes.map((note: any, index: number) => (
                    <TextInput
                        key={index}
                        placeholder="Note"
                        value={note.note}
                        onChange={(e) =>
                            handleNoteChange(index, e.currentTarget.value)
                        }
                    />
                ))}
                <Button variant="light" onClick={addNewNote}>
                    + Add Note
                </Button>
            </Stack> */}
            <ListInput
                title="Ingredients"
                items={newRecipeDetail.ingredients}
                onChange={(index, value) => updateList("ingredients", "ingredient", index, value)}
                onAdd={() => addToList("ingredients", "ingredient")}
                onDelete={(index) => removeFromList("ingredients", "ingredient", index)}
            />
            <ListInput
                title="Instructions"
                items={newRecipeDetail.instructions}
                onChange={(index, value) => updateList("instructions", "instruction", index, value)}
                onAdd={() => addToList("instructions", "instruction")}
                onDelete={(index) => removeFromList("instructions", "instruction", index)}
            />
        </Fieldset>

        <Button mt="md" onClick={handleAddRecipe}>
            Submit new recipe!
        </Button>
        </Box>
    );
};

export default CreatePage;
