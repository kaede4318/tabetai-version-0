import React from "react";
import { Stack, TextInput, Button, Group, Title } from "@mantine/core";

interface ListInputProps {
    title: string;
    items: string[];
    onChange: (index: number, value: string) => void;
    onAdd: () => void;
    onDelete: (index: number) => void;
}

// TODO: add functionality where users can rearrange the elements in the list if they want to change the 
// order in which items appear

const ListInput: React.FC<ListInputProps> = ({ title, items, onChange, onAdd, onDelete }) => {
    return (
        <Stack mb="md">
            <Title order={5}>{title}</Title>

            {items.map((item, index) => (
                <Group key={index} align="center">
                    {/* TODO: bug -- each field shows "Equipmen" instead of "Equipment" since the string
                    is cut off at the end to remove the 's' for the other fields, like ingredient(s) */}
                    <TextInput
                        placeholder={`${title.slice(0, -1)} ${index + 1}`}
                        value={Object.values(item)[0]}
                        onChange={(e) => onChange(index, e.currentTarget.value)}
                        style={{ flex: 1 }}
                    />
                    <Button variant="subtle" color="red" onClick={() => onDelete(index)}>
                        Delete
                    </Button>
                </Group>
            ))}

            {/* TODO: same string cut-off bug here! */}
            <Button variant="light" onClick={onAdd}>
                + Add New
                {/* + Add {title.slice(0, -1)} */}
            </Button>
        </Stack>
    );
};

export default ListInput;