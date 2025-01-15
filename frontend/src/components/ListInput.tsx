// import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
// import { useRecipeStore } from "../store/recipeState";

// type ListInputProps = {
//     field: string
// }

// // Additional work needed
// // Note: this doesn't really work at all at the moment.
// // There is a "stale value" issue where when an input is typed, the newRecipeDetail below uses
// // the previous value of the input. In cases where a single character is typed, the newRecipeDetail
// // would contain a null value for the field (e.g. "" when "A" is typed) and cause the API to error.

// const ListInput: React.FC<ListInputProps> = ({ field }) => {
//     const { newRecipeDetail, setNewRecipeDetail } = useRecipeStore();

//     // handle changes for field, whether it is ingredients, instructions, equipment, notes, etc.
//     const handleItemChange = (index: number, value: string) => {
//         const updatedItems = [...newRecipeDetail[field]]; // this is how to make a dynamic field access
        
//         // Note: in the future, if an item is not a string, be sure to change this line!
//         updatedItems[index] = value; // assuming that each item is a string
//         setNewRecipeDetail(field, updatedItems);
//     };

//     // add a new item to the specified field
//     const addNewItem = () => {
//         setNewRecipeDetail(field, [...newRecipeDetail[field], ""]);
//     };

//     // remove an item from the specified field
//     const removeItem = (index: number) => {
//         const updatedItems = newRecipeDetail[field].filter((_: any, i: number) => i !== index);
//         setNewRecipeDetail(field, updatedItems);
//     };
    
//     // field corresponds to newRecipeDetail, addNewItem, removeItem, handleChange
//     return (
//         <Stack mt="md">
//             <Title order={5}>{field.charAt(0).toUpperCase() + field.slice(1)}</Title>
//             {newRecipeDetail[field].map((item: string, index: number) => (
//                 <Group key={index}>
//                     <TextInput
//                         placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                         value={item}
//                         onChange={(e) => handleItemChange(index, e.currentTarget.value)}
//                     />
//                     <Button
//                         variant="light"
//                         color="red"
//                         onClick={() => removeItem(index)}
//                     >
//                         Delete
//                     </Button>
//                 </Group>
//             ))}
//             <Button variant="light" onClick={addNewItem}>
//                 + Add {field.charAt(0).toUpperCase() + field.slice(1)}
//             </Button>
//         </Stack>
//     );
// }

// export default ListInput;
import React from "react";
import { Stack, TextInput, Button, Group } from "@mantine/core";

interface ListInputProps {
  title: string;
  items: { value: string }[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
}

const ListInput: React.FC<ListInputProps> = ({ title, items, onChange, onAdd, onDelete }) => {
  return (
    <Stack mt="md">
      <h5>{title}</h5>
      {items.map((item, index) => (
        <Group key={index} align="center">
          <TextInput
            placeholder={`${title.slice(0, -1)} ${index + 1}`}
            value={item.value}
            onChange={(e) => onChange(index, e.currentTarget.value)}
            style={{ flex: 1 }}
          />
          <Button variant="subtle" color="red" onClick={() => onDelete(index)}>
            Delete
          </Button>
        </Group>
      ))}
      <Button variant="light" onClick={onAdd}>
        + Add {title.slice(0, -1)}
      </Button>
    </Stack>
  );
};

export default ListInput;
