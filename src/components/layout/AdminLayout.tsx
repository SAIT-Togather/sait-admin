import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

import "../../styles/layout/admin-layout.css";
import "../../styles/layout/sidebar.css";
import "../../styles/layout/header.css";
import "../../styles/layout/footer.css";

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className={`admin-layout ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => {
          setSidebarCollapsed((prev) => !prev);
        }}
      />

      <div className="admin-main">
        <Header />

        <main className="admin-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}