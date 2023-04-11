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
      <Route path="signup" element={<SignUpScreen />}></Route>
      <Route path="login" element={<LoginScreen />}></Route>
      <Route path="phone" element={<PhoneLogin />}></Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <RootLayout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<MainScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="create" element={<CreateTrip />} />
      </Route>
      <Route
        path="admin"
        element={
          <AdminPrivateRoute>
            <RootLayout />
          </AdminPrivateRoute>
        }
      >
        <Route path="admin" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
