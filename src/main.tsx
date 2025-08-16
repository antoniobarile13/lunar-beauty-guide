import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AndroidIconService } from './services/androidIconService'

// Initialize moon phase shortcuts for Android
AndroidIconService.initDailyUpdates();

createRoot(document.getElementById("root")!).render(<App />);
