import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Base64Page } from "./pages/Base64Page";
import { DashboardPage } from "./pages/DashboardPage";
import { JsonFormatterPage } from "./pages/JsonFormatterPage";
import { PasswordGeneratorPage } from "./pages/PasswordGeneratorPage";
import { SqlFormatterPage } from "./pages/SqlFormatterPage";
import { UuidGeneratorPage } from "./pages/UuidGeneratorPage";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/json-formatter" element={<JsonFormatterPage />} />
        <Route path="/base64" element={<Base64Page />} />
        <Route path="/uuid-generator" element={<UuidGeneratorPage />} />
        <Route path="/password-generator" element={<PasswordGeneratorPage />} />
        <Route path="/sql-formatter" element={<SqlFormatterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
