// import { AppShell, Navbar, Header, Text, Container } from '@mantine/core';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

function AppShellLayout() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 250,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding={{ base: 10, sm: 15, lg: 20 }}
        >
            <AppShell.Header>
                <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
                />
                <div>Logo</div>
            </AppShell.Header>

            <AppShell.Navbar 
                p="sm"
            >
                Navbar
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
