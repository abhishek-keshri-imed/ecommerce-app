import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from 'react-redux';
import store from './store/index'; 

// 1. Import Toaster from react-hot-toast
import { Toaster } from 'react-hot-toast';

// Lazy load App component
const App = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
          
          {/* 2. Add Toaster here. It will stay on top of all pages. */}
          <Toaster 
            toastOptions={{
              position: 'top-right',
              style: {
                background: '#283046', // Dark background for modern look
                color: 'white'
              }
            }} 
          />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);