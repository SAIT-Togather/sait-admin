import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import MemberList from "./pages/admin/members/MemberListPage";

function App() {
  return (
    <Routes>
      {/* 로그인 */}
      <Route path="/adminlogin" element={<LoginPage />} />

      {/* 관리자 공통 레이아웃 */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* /admin 접근 시 대시보드로 이동 */}
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        {/* 대시보드 */}
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        {/* 회원관리 */}
        <Route
          path="members"
          element={<MemberList />}
        />
      </Route>

      {/* 잘못된 주소 접근 시 로그인으로 */}
      <Route
        path="*"
        element={<Navigate to="/adminlogin" replace />}
      />
    </Routes>
  );
}

export default App;