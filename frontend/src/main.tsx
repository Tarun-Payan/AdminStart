import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from '@/routes/AppRoutes.tsx'
import { ThemeProvider } from "@/components/theme-provider"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  </StrictMode>,
)
