// import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
// import { Link } from "react-router-dom";

import { Button, Text, NavLink, Stack, Anchor } from "@mantine/core";
import { FiPlus } from "react-icons/fi";

// import { PlusSquareIcon } from "@chakra-ui/icons";
// import { IoMoon } from "react-icons/io5";
// import { LuSun } from "react-icons/lu";

// const Navbar = () => {
// 	const { colorMode, toggleColorMode } = useColorMode();

// 	return (
// 		<Container maxW={"1140px"} px={4}>
// 			<Flex
// 				h={16}
// 				alignItems={"center"}
// 				justifyContent={"space-between"}
// 				flexDir={{
// 					base: "column",
// 					sm: "row",
// 				}}
// 			>
// 				<Text
// 					fontSize={{ base: "22", sm: "28" }}
// 					fontWeight={"bold"}
// 					textTransform={"uppercase"}
// 					textAlign={"center"}
// 					bgGradient={"linear(to-r, cyan.400, blue.500)"}
// 					bgClip={"text"}
// 				>
// 					<Link to={"/"}>Product Store 🛒</Link>
// 				</Text>

// 				<HStack spacing={2} alignItems={"center"}>
// 					<Link to={"/create"}>
// 						<Button>
// 							<PlusSquareIcon fontSize={20} />
// 						</Button>
// 					</Link>
// 					<Button onClick={toggleColorMode}>
// 						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
// 					</Button>
// 				</HStack>
// 			</Flex>
// 		</Container>
// 	);
// };

const Navbar = () => {
    
    return (
        <Stack
            h="100%"
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="space-between"
            // gap="xl" // not needed?
        >
            <Button
                variant="default"
            >
                Big Button
            </Button>

            <div>
                <NavLink
                    href="/create"
                    label="Create New Recipe [TODO]"
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
