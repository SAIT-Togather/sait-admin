import { NavLink } from "react-router-dom";

import {
  House,
  Users,
  Megaphone,
  ClipboardList,
  ChartNoAxesColumnIncreasing,
  ChartPie,
  CalendarDays,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const menuItems = [
  {
    label: "대시보드",
    path: "/admin/dashboard",
    icon: House,
  },
  {
    label: "회원 관리",
    path: "/admin/members",
    icon: Users,
  },
  {
    label: "공지사항",
    path: "/admin/notices",
    icon: Megaphone,
  },
  {
    label: "약관 관리",
    path: "/admin/terms",
    icon: ClipboardList,
  },
  {
    label: "가입 통계",
    path: "/admin/statistics/signup",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    label: "접속 통계",
    path: "/admin/statistics/access",
    icon: ChartPie,
  },
  {
    label: "일정 통계",
    path: "/admin/statistics/schedule",
    icon: CalendarDays,
  },
  {
    label: "서비스 설정",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className={`admin-sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >
      {/* =========================
          LOGO
      ========================= */}
      <div className="sidebar-logo">
        <NavLink
          to="/admin/dashboard"
          className="sidebar-logo-link"
        >
          <img
            src="/images/sait-logo.png"
            alt="SAIT"
            className="sidebar-logo-image"
          />

          {!collapsed && (
            <span className="sidebar-logo-title">
              SAIT
            </span>
          )}
        </NavLink>
      </div>

      {/* =========================
          MENU
      ========================= */}
      <nav className="sidebar-menu">
        {menuItems.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `sidebar-menu-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="sidebar-menu-icon">
                <Icon
                  size={20}
                  strokeWidth={1.8}
                />
              </span>

              {!collapsed && (
                <span className="sidebar-menu-text">
                  {menu.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* =========================
          SIDEBAR TOGGLE
      ========================= */}
      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-toggle-button"
          onClick={onToggle}
        >
          {collapsed ? (
            <ChevronRight
              size={18}
              strokeWidth={1.8}
            />
          ) : (
            <ChevronLeft
              size={18}
              strokeWidth={1.8}
            />
          )}

          {!collapsed && (
            <span>사이드바 접기</span>
          )}
        </button>
      </div>
    </aside>
  );
}