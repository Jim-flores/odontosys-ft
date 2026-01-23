import StorageAdapter from "@/storage/StorageAdapter";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  const isAuthenticated = StorageAdapter.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
