import React from "react";
import { useAuth } from "./hooks/useAuth";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import MainScreen from "./screen/MainScreen";
import CreateTrip from "./screen/CreateTrip";
import SignUpScreen from "./screen/SignUpScreen";
import LoginScreen from "./screen/LoginScreen";
import PhoneLogin from "./screen/PhoneLogin";
import RootLayout from "./screen/RootLayout";
import ProfileScreen from "./screen/ProfileScreen";
import AdminPage from "./screen/AdminPage";
import NotFoundPage from "./screen/NotFoundPage";
import Spinner from "./components/Spinner/Spinner";

export const PrivateRoute = ({ children }) => {
  const user = useAuth();
  return typeof user === "undefined" ? (
    <Spinner />
  ) : user ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export const AdminPrivateRoute = ({ children }) => {
  const user = useAuth();
  return typeof user === "undefined" ? (
    <Spinner />
  ) : user ? (
    user?.currentUser?.email === "test@gmail.com" ? (
      children
    ) : (
      <NotFoundPage />
    )
  ) : (
    <Navigate to="/" />
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="drivers/signup" element={<SignUpScreen />}></Route>
      <Route path="drivers/login" element={<LoginScreen />}></Route>
      <Route path="drivers/phone" element={<PhoneLogin />}></Route>
      <Route
        path="drivers/"
        element={
          <PrivateRoute>
            <RootLayout />
          </PrivateRoute>
        }
      >
        <Route path="drivers/" element={<MainScreen />} />
        <Route path="drivers/profile" element={<ProfileScreen />} />
        <Route path="drivers/create" element={<CreateTrip />} />
      </Route>
      <Route
        path="drivers/admin"
        element={
          <AdminPrivateRoute>
            <RootLayout />
          </AdminPrivateRoute>
        }
      >
        <Route path="drivers/admin" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
