import React from 'react';
import { createRoot } from 'react-dom/client';
import StockReportChatbot from './home.jsx'; // Ensure the extension matches

console.log("✅ index.js Loaded! Attempting to render React...");

const rootElement = document.getElementById('root');

if (rootElement) {
    console.log("✅ Found #root element! Rendering React...");
    const root = createRoot(rootElement);
    root.render(<StockReportChatbot />);
} else {
    console.error("❌ ERROR: #root element NOT FOUND!");
}
