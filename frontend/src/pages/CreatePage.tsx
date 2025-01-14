import { useState } from "react"
import { useRecipeStore } from "../store/recipe";
// TODO: Uncomment the two imports below when the files have been converted to .ts
// import { Recipe } from "../../../backend/models/recipe.model.js";
// import { RecipeDetail } from "../../../backend/models/recipeDetail.model.js";
import { InferSchemaType } from "mongoose";
import { Anchor, Box, Button, Fieldset, FileInput, Group, MultiSelect, NumberInput, Stack, TextInput, Title } from "@mantine/core";

const emptyRecipe = {
    name: "",
    author: "",
    rating: null,
    image: "",
    tags: [],
    detailId: null 
};

const emptyRecipeDetail = {
    servings: null,
    cookingTime: {},
    ingredients: [],
    equipment: [],
    instructions: [],
    notes: [],
    link: ""
};

// TODO: Convert backend to Typescript as well.
// type RecipeDoc = InferSchemaType<typeof Recipe.schema>;

const CreatePage: React.FC = () => {
    let [newRecipe, setNewRecipe] = useState<any>(emptyRecipe); // change type from any?

    const { createRecipe } = useRecipeStore();

    const handleAddRecipe = async () => {
        let { success, message } = await createRecipe(newRecipe);

        // IGNORE FOR NOW: add status toast here

        setNewRecipe(emptyRecipe);
    };
    
    return (
        <Box>
            <Fieldset legend="Basic Info">
                <TextInput label="Recipe Name" placeholder="My Recipe" /> 
                <TextInput label="Recipe Author" placeholder="Me" mt="md" />
                {/* number of servings input component */}
                {/* Cook time input, need: total, prep, cook component */}
                {/* tags input component */}
                {/* recipe picture input component, accept photo file types only */}
            </Fieldset>

            <Fieldset legend="Details">
                {/* Recipe ingredient list:text input for ingredients, which is a string. IMPORTANT: use one TextInput component per ingredient, and allow user to create a new TextInput for each new ingredient. Collect all ingredients into a list. */}
                {/* Recipe method: Do the same as above but for recipe steps. Also include an optional section to add one or more images per step. */}
                {/* Note section: Lastly, do the same as the previous two but for any additional notes. */}
            </Fieldset>
        <Button
            onClick={handleAddRecipe}
        >
            Submit new recipe!
        </Button>
        </Box>
    );
}

export default CreatePage