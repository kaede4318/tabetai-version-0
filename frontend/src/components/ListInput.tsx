import React from "react";
import { Stack, TextInput, Button, Group } from "@mantine/core";

interface ListInputProps {
    title: string;
    items: { value: string }[];
    onChange: (index: number, value: string) => void;
    onAdd: () => void;
    onDelete: (index: number) => void;
}

// TODO: add function where users can rearrange the elements in the list

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