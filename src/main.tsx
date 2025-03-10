import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from './App.tsx'
import { HeroUIProvider } from "@heroui/system";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/find-github-user" element={<App />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HeroUIProvider>
  </StrictMode>,
)
