import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute";
import ConsultantsPage from "../pages/ConsultantsPage";
import ClientsPage from "../pages/ClientsPage";
import JobtypesPage from "../pages/JobtypesPage";
import TechStackPage from "../pages/TechStackPage";
import LocationsPage from "../pages/LocationsPage";
import SubmissionsPage from "../pages/SubmissionsPage";
import VisaPage from "../pages/VisaPage";
import RoleManagementPage from "../pages/RoleManagementPage";
import PlacementsPage from "../pages/PlacementsPage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import IncentivesPage from "../pages/IncentivesPage";
import SetPasswordPage from "../pages/SetPasswordPage";
import MyProfilePage from "../pages/MyProfilePage";
import DocumentsPage from "../pages/DocumentsPage";
import RecruitersPage from "../pages/RecruitersPage";
import HolidaysPage from "../pages/HolidaysPage";
import LeavesPage from "../pages/LeavesPage";
import ManagersPage from "../pages/ManagersPage";
import MyProjectsPage from "../pages/MyProjectsPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import MenuSQLGeneratorPage from "../pages/AdminTools/MenuSQLGeneratorPage";
import NotFoundPage from "../pages/NotFoundPage";
import PermissionMatrix from "../components/AdminTools/PermissionMatrix";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

export default function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const { isLoading } = useLoading();

  if (loading || isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/set-password" element={<SetPasswordPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/consultants"
        element={
          <PrivateRoute>
            <Layout>
              <ConsultantsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <PrivateRoute>
            <Layout>
              <ClientsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/recruiters"
        element={
          <PrivateRoute>
            <Layout>
              <RecruitersPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/managers"
        element={
          <PrivateRoute>
            <Layout>
              <ManagersPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <PrivateRoute>
            <Layout>
              <DocumentsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/holidays"
        element={
          <PrivateRoute>
            <Layout>
              <HolidaysPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/leaves"
        element={
          <PrivateRoute>
            <Layout>
              <LeavesPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/my-profile"
        element={
          <PrivateRoute>
            <Layout>
              <MyProfilePage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/my-projects"
        element={
          <PrivateRoute>
            <Layout>
              <MyProjectsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/master-data/jobtypes"
        element={
          <PrivateRoute>
            <Layout>
              <JobtypesPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/submissions"
        element={
          <PrivateRoute>
            <Layout>
              <SubmissionsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/placements"
        element={
          <PrivateRoute>
            <Layout>
              <PlacementsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/incentives"
        element={
          <PrivateRoute>
            <Layout>
              <IncentivesPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/master-data/techstack"
        element={
          <PrivateRoute>
            <Layout>
              <TechStackPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/master-data/locations"
        element={
          <PrivateRoute>
            <Layout>
              <LocationsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/master-data/visa"
        element={
          <PrivateRoute>
            <Layout>
              <VisaPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/master-data/roles"
        element={
          <PrivateRoute>
            <Layout>
              <RoleManagementPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/menu-generator"
        element={
          <PrivateRoute>
            <Layout>
              <MenuSQLGeneratorPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/permissions"
        element={
          <PrivateRoute>
            <Layout>
              <PermissionMatrix />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
