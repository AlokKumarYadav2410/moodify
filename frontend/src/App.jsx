import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/app.routes";
import { AuthContextProvider } from "./features/auth/auth.context";
import "./features/shared/styles/global.scss";
import { ThemeContextProvider } from "./features/shared/theme.context";

const App = () => {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </AuthContextProvider>
  );
};

export default App;
