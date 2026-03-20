import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource-variable/playfair-display";
// init i18n (side-effect import — must come before App)
import "./components/lib/i18n.js";
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/context/ThemeContext.jsx';
import { LanguageProvider } from './components/context/LanguageContext.jsx';
import { HeroUIProvider } from '@heroui/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <HeroUIProvider>
          <App />
        </HeroUIProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
