import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/app.routes";
import { AuthContextProvider } from "./features/auth/auth.context";
import "./features/shared/styles/global.scss";
import { ThemeContextProvider } from "./features/shared/theme.context";
import { Provider } from "react-redux";
import { store } from "./app/store";

const App = () => {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <RouterProvider router={router} />
        </ThemeContextProvider>
      </AuthContextProvider>
    </Provider>
  );
};

export default App;
