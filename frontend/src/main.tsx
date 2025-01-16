import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { Notifications } from '@mantine/notifications'

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
        <MantineProvider>
            <Notifications />
            <App />
        </MantineProvider>    
        </BrowserRouter>
    </StrictMode>,
)
