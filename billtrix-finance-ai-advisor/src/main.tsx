
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { checkEnvironmentVariables } from './utils/envCheck';

// Run environment variable check and show warning if needed
const envCheckPassed = checkEnvironmentVariables();
if (!envCheckPassed) {
  console.warn(`
    ⚠️ Application running in development mode with fallback values.
    Some features may not work correctly.
  `);
}

createRoot(document.getElementById("root")!).render(<App />);
