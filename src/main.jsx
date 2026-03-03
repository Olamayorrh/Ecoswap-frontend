import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Context from './context/Context.jsx'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Context>
          <App />
        </Context>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
