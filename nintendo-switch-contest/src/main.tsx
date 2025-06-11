import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// 🤫 Hide annoying console errors that don't break the app
const shouldFilterConsole = import.meta.env.PROD || import.meta.env.MODE === 'production'
if (shouldFilterConsole) {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  console.error = (...args: unknown[]) => {
    const message = args.join(' ').toLowerCase();
    
    // Filter out these non-critical errors
    if (
      message.includes('load failed') ||
      message.includes('chunk load failed') ||
      message.includes('loading chunk') ||
      message.includes('loading css chunk') ||
      message.includes('script error') ||
      message.includes('network error') ||
      message.includes('failed to fetch')
    ) {
      return; // Silently ignore these errors
    }
    
    // Keep important errors
    originalConsoleError.apply(console, args);
  };
  
  console.warn = (...args: unknown[]) => {
    const message = args.join(' ').toLowerCase();
    
    // Filter out non-critical warnings
    if (
      message.includes('chunk') ||
      message.includes('deprecated') ||
      message.includes('warning:')
    ) {
      return; // Silently ignore these warnings
    }
    
    originalConsoleWarn.apply(console, args);
  };
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id "root" not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
