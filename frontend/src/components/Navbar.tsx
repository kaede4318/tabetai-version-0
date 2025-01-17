import { Button, Text, NavLink, Stack, Anchor } from "@mantine/core";
import { FiPlus } from "react-icons/fi";

const Navbar = () => {
    
    return (
        <Stack
            h="100%"
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="space-between"
        >
            <Button
                variant="default"
            >
                Big Button
            </Button>

            <div>
                <NavLink
                    href="/create"
                    label="Create New Recipe"
                    leftSection={<FiPlus />}
                />
                <NavLink
                    href=""
                    label="Explore [TODO]"
                    leftSection="🌎"
                />
                <NavLink
                    href=""
                    label="Recipes [TODO]"
                    leftSection="🧑‍🍳"
                />
                <NavLink
                    href=""
                    label="Equipment [TODO]"
                    leftSection="🍳"
                />
                <NavLink
                    href=""
                    label="Try something new [TODO]"
                    leftSection="✨"
                />
            </div>

            <div></div>
            
            <Anchor
                href="https://www.youtube.com/watch?v=UPDjHfOiIWQ"
                target="_blank" 
                underline="never"
            >
                <Text size="xs">🩵</Text>
            </Anchor>
        </Stack>
    );
};

export default Navbar;
