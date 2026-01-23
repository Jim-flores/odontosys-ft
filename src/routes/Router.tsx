import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "@/modules/auth/Login";
import Layout from "@/layouts/dashboard/Layout";
import NotFoundPage from "@/pages/NotFoundPage";
import Charts from "@/modules/charts/Charts";
import TableExample from "@/modules/tables/TableExample";
import FormExample from "@/modules/forms/FormExample";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route path="charts" element={<Charts />} />
            <Route path="tables" element={<TableExample />} />
            <Route path="forms" element={<FormExample />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
