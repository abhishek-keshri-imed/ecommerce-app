import React from "react";
import Router from "./router/Router"; 
import AppRoutes from "./router/routes/AppRoutes"; 

/**
 * The main App component.
 * It passes the complete array of routes (Public + Protected)
 * to the generic Router component.
 */
function App() {
  return (
    <div className="App">
      {/* AppRoutes contains:
          1. PublicRoutes (/login, /admin-login, /register)
          2. ProtectedRoutes (wrapped in security logic for Admin and Customers)
      */}
      <Router allRoutes={AppRoutes} />
    </div>
  );
}

export default App;