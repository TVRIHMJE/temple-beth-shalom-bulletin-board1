
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Initialize persistentStorage if it doesn't exist
import './utils/persistentStorage';

// Global error handlers
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Prevent the default browser behavior of logging unhandled rejections
  event.preventDefault();
});

window.addEventListener('error', (event) => {
  console.error('JavaScript error:', event.error);
});

// Performance monitoring
if ('performance' in window && 'getEntriesByType' in performance) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      try {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }
      } catch (error) {
        console.warn('Performance monitoring failed:', error);
      }
    }, 0);
  });
}

// Create root and render app
const initializeApp = () => {
  const container = document.getElementById('app');
  
  if (!container) {
    console.error('App container not found');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize React app:', error);
    
    // Fallback: show error message
    container.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
        <h2>Application Error</h2>
        <p>Failed to load the application. Please refresh the page to try again.</p>
        <button onclick="window.location.reload()" style="padding: 0.75rem 2rem; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 1rem;">
          Refresh Page
        </button>
      </div>
    `;
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
