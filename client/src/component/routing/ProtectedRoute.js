import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = ({ children }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  }

  return isAuthenticated ? (
    <>
      <NavbarMenu />
      {children}
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

export default ProtectedRoute;
