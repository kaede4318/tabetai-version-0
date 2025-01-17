import { Anchor, AppShell, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function AppShellLayout() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 210,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding={{ base: 10, sm: 15, lg: 20 }}
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger 
                        opened={opened} 
                        onClick={toggle} 
                        hiddenFrom="sm" 
                        size="sm" 
                    />
                    <Anchor
                        href={"/"}
                        underline="never"
                        ml="xl"
                    >
                        <Title>tabetai</Title>
                    </Anchor>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar 
                p="sm"
            >
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main
                w="100%"
            >
                {/* Renders the content of the current route */}
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

export default AppShellLayout;
