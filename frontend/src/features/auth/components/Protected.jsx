import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loader from "../../shared/components/Loader";
import Layout from "../../shared/components/Layout";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader text="Loading..." />;
  }

  if (!user && !loading) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
};

export default Protected;
