// src/router/Router.jsx
import { useRoutes } from "react-router-dom";

const Router = ({ allRoutes }) => {
  // useRoutes will take the array of route objects and render them
  return useRoutes(allRoutes);
};

export default Router;
