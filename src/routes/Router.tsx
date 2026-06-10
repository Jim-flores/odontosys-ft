import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "@/modules/auth/Login";
import Layout from "@/layouts/dashboard/Layout";
import NotFoundPage from "@/pages/NotFoundPage";
import Charts from "@/modules/charts/Charts";
import TableExample from "@/modules/tables/TableExample";
import FormExample from "@/modules/forms/FormExample";
import WelcomePage from "@/layouts/dashboard/WelcomePage";
import UsersPage from "@/modules/users/pages/UsersPage";
import CompanyPage from "@/modules/company/pages/CompanyPage";
import CustumersPage from "@/modules/custumers/pages/CustumersPage";
import CustumerInformation from "@/modules/custumers/components/custumerInformation/CustumerInformation";
import Information from "@/modules/custumers/components/custumerInformation/Information";
import Odontogram from "@/modules/custumers/components/custumerInformation/Odontogram";
import AppointmentsPage from "@/modules/appointments/pages/AppointmentsPage";

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
            <Route path="" element={<WelcomePage />} />
            <Route path="charts" element={<Charts />} />
            <Route path="tables" element={<TableExample />} />
            <Route path="forms" element={<FormExample />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="custumers" element={<CustumersPage />} />
            <Route path="custumers/:id" element={<CustumerInformation />}>
              <Route index element={<Information />} />
              <Route path="filiacion" element={<Information />} />
              <Route path="odontograma" element={<Odontogram />} />
            </Route>
            <Route path="company" element={<CompanyPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
