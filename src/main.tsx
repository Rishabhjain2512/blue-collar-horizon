
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';

// Initialize language from localStorage if available
const savedLanguage = localStorage.getItem('i18nextLng');
if (savedLanguage) {
  // i18next will use this during initialization
  console.log(`Restoring saved language: ${savedLanguage}`);
}

createRoot(document.getElementById("root")!).render(<App />);
