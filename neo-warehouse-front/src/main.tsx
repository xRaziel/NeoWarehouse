import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'
import { SnackbarProvider } from './shared/Snackbar.tsx'

createRoot(document.getElementById('root')! as HTMLElement).render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>,
)
