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
        console.log(success)
        console.log(message)
        // IGNORE FOR NOW: Add status toast here
        if (success) {
        setNewRecipe(emptyRecipe);
        setNewRecipeDetail(emptyRecipeDetail);
        } else {
        console.error(message);
        }
    };

    // const handleIngredientChange = (index: number, value: string) => {
    //     const updatedIngredients = [...newRecipeDetail.ingredients];
    //     updatedIngredients[index] = { ingredient: value };
    //     setNewRecipeDetail({ ...newRecipeDetail, ingredients: updatedIngredients });
    // };

    // const addNewIngredient = () => {
    //     setNewRecipeDetail({
    //     ...newRecipeDetail,
    //     ingredients: [...newRecipeDetail.ingredients, { ingredient: "" }],
    //     });
    // };

    // const handleInstructionChange = (index: number, value: string) => {
    //     const updatedInstructions = [...newRecipeDetail.instructions];
    //     updatedInstructions[index] = { instruction: value };
    //     setNewRecipeDetail({ ...newRecipeDetail, instructions: updatedInstructions });
    // };

    // const addNewInstruction = () => {
    //     setNewRecipeDetail({
    //     ...newRecipeDetail,
    //     instructions: [...newRecipeDetail.instructions, { instruction: "" }],
    //     });
    // };

    // const handleNoteChange = (index: number, value: string) => {
    //     const updatedNotes = [...newRecipeDetail.notes];
    //     updatedNotes[index] = { note: value };
    //     setNewRecipeDetail({ ...newRecipeDetail, notes: updatedNotes });
    // };

    // const addNewNote = () => {
    //     setNewRecipeDetail({
    //     ...newRecipeDetail,
    //     notes: [...newRecipeDetail.notes, { note: "" }],
    //     });
    // };
    const updateList = (field: string, innerField: string, index: number, value: string) => {
        const updatedList = [...newRecipeDetail[field]];
        updatedList[index] = { [innerField]: value };
        console.log("updatedList[index] ")
        console.log(updatedList[index])
        setNewRecipeDetail({ ...newRecipeDetail, [field]: updatedList });
        console.log(newRecipeDetail)
      };
    
      const addToList = (field: string, innerField: string) => {
        console.log("Field: "+field)
        setNewRecipeDetail({
          ...newRecipeDetail,
          [field]: [...newRecipeDetail[field], { [innerField]: "" }],
        });
        
      };
    
      const removeFromList = (field: string, innerField: string, index: number) => {
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
