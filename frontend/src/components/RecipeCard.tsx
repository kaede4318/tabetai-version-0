// import React from 'react'
import type { Recipe } from "../store/recipe";

import { Card, Image, Text, Badge, Group } from '@mantine/core';

const RecipeCard = ({ recipe }: {recipe: Recipe}) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={recipe.image}
                    fallbackSrc={"https://placehold.co/600x400?text=Image+not+found+:("}
                    height={200}
                    alt="Food"
                />
            </Card.Section>
    
            <Group 
                justify="space-between" 
                mt="md" 
                mb="xs"
            >
                <Text fw={500}>{recipe.name}</Text>
            </Group>
    
            <Group
                gap="xs"
            >
                {recipe.tags.map((tag: any) => (
                    <Badge color="#10bcfc">
                        {tag.tag}
                    </Badge>
                ))}
            </Group>
        </Card>
    )
}

export default RecipeCard