import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { AuthRoute } from "./AuthRouter";
import Admin from "../pages/Admin";

export const RouterComponent = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthRoute type="guest">
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="/"
        element={
          <AuthRoute type="protected">
            <Home />
          </AuthRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AuthRoute type="protected">
            <Admin />
          </AuthRoute>
        }
      />
      <Route path="*" element={<AuthRoute type="fallback" />} />
    </Routes>
  );
};
