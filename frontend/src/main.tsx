import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from '@/routes/AppRoutes.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  </StrictMode>,
)
