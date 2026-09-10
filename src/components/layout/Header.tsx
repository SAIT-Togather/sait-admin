import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  ChevronDown,
  UserRound,
  LockKeyhole,
  LogOut,
} from "lucide-react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const getTitle = () => {
    const path = location.pathname;

    if (path === "/admin/dashboard") {
      return "Dashboard";
    }

    if (path.startsWith("/admin/members")) {
      return "회원 관리";
    }

    if (path.startsWith("/admin/notices")) {
      return "공지사항";
    }

    if (path.startsWith("/admin/terms")) {
      return "약관 관리";
    }

    if (path.startsWith("/admin/statistics/signup")) {
      return "가입 통계";
    }

    if (path.startsWith("/admin/statistics/access")) {
      return "접속 통계";
    }

    if (path.startsWith("/admin/statistics/schedule")) {
      return "일정 통계";
    }

    if (path.startsWith("/admin/settings")) {
      return "서비스 설정";
    }

    return "관리자";
  };

  const handleLogout = () => {
    sessionStorage.removeItem(
      "SAIT_ACCESS_TOKEN"
    );

    navigate("/adminlogin", {
      replace: true,
    });
  };

  return (
    <header className="admin-header">
      {/* =========================
          LEFT
      ========================= */}
      <div className="admin-header-left">
        <h1 className="admin-header-title">
          {getTitle()}
        </h1>
      </div>

      {/* =========================
          RIGHT
      ========================= */}
      <div className="admin-header-right">

        {/* 검색 */}
        <div className="admin-search">
          <Search
            size={18}
            strokeWidth={1.8}
            className="admin-search-icon"
          />

          <input
            type="text"
            placeholder="검색어를 입력하세요"
          />

          <span className="admin-search-shortcut">
            ⌘ K
          </span>
        </div>

        {/* 알림 */}
        <button
          type="button"
          className="admin-notification-button"
          aria-label="알림"
        >
          <Bell
            size={21}
            strokeWidth={1.8}
          />

          <span className="admin-notification-count">
            3
          </span>
        </button>

        {/* 프로필 */}
        <div className="admin-profile">

          <div className="admin-profile-avatar">
            A
          </div>

          <div className="admin-profile-info">
            <strong>관리자</strong>
            <span>admin@sait.io</span>
          </div>

          <button
            type="button"
            className={`admin-profile-arrow ${
              profileMenuOpen ? "open" : ""
            }`}
            onClick={() =>
              setProfileMenuOpen((prev) => !prev)
            }
            aria-label="프로필 메뉴"
          >
            <ChevronDown
              size={17}
              strokeWidth={1.8}
            />
          </button>


          {/* 프로필 드롭다운 */}
          {profileMenuOpen && (
            <div className="admin-profile-dropdown">

              <div className="admin-profile-dropdown-user">
                <strong>관리자</strong>
                <span>admin@sait.io</span>
              </div>

              <div className="admin-profile-dropdown-divider" />

              <button
                type="button"
                className="admin-profile-dropdown-item"
                  onClick={() => {
                  setProfileMenuOpen(false);
                  setProfileModalOpen(true);
                }}
              >
                <UserRound
                  size={17}
                  strokeWidth={1.8}
                />

                <span>내 정보</span>
              </button>

              <button
                type="button"
                className="admin-profile-dropdown-item"
                onClick={() => {
                  setProfileMenuOpen(false);
                  setPasswordModalOpen(true);
                }}
              >
                <LockKeyhole
                  size={17}
                  strokeWidth={1.8}
                />

                <span>비밀번호 변경</span>
              </button>

              <div className="admin-profile-dropdown-divider" />

              <button
                type="button"
                className="admin-profile-dropdown-item logout"
                onClick={handleLogout}
              >
                <LogOut
                  size={17}
                  strokeWidth={1.8}
                />

                <span>로그아웃</span>
              </button>

            </div>
          )}

        </div>

      </div>
      {/* 내정보 모달 */}
      {profileModalOpen && (
      <div
        className="admin-profile-modal-backdrop"
        onClick={() => setProfileModalOpen(false)}
      >
        <div
          className="admin-profile-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="admin-profile-modal-header">
            <h3>내 정보</h3>

            <button
              type="button"
              className="admin-profile-modal-close"
              onClick={() => setProfileModalOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="admin-profile-modal-body">
            <div className="admin-profile-modal-avatar">
              A
            </div>

            <div className="admin-profile-modal-info">
              <div className="admin-profile-modal-row">
                <span>이름</span>
                <strong>관리자</strong>
              </div>

              <div className="admin-profile-modal-row">
                <span>이메일</span>
                <strong>admin@sait.io</strong>
              </div>

              <div className="admin-profile-modal-row">
                <span>권한</span>
                <strong>ADMIN</strong>
              </div>
            </div>
          </div>

          <div className="admin-profile-modal-footer">
            <button
              type="button"
              className="admin-profile-modal-confirm"
              onClick={() => setProfileModalOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    )}

    {/* 비밀번호 변경 모달 */}
    {passwordModalOpen && (
      <div
        className="admin-profile-modal-backdrop"
        onClick={() => setPasswordModalOpen(false)}
      >
        <div
          className="admin-password-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="admin-profile-modal-header">
            <h3>비밀번호 변경</h3>

            <button
              type="button"
              className="admin-profile-modal-close"
              onClick={() => setPasswordModalOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="admin-password-modal-body">

            <div className="admin-password-field">
              <label>현재 비밀번호</label>

              <input
                type="password"
                placeholder="현재 비밀번호를 입력하세요"
              />
            </div>

            <div className="admin-password-field">
              <label>새 비밀번호</label>

              <input
                type="password"
                placeholder="새 비밀번호를 입력하세요"
              />
            </div>

            <div className="admin-password-field">
              <label>새 비밀번호 확인</label>

              <input
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요"
              />
            </div>

          </div>

          <div className="admin-profile-modal-footer">
            <button
              type="button"
              className="admin-password-cancel"
              onClick={() => setPasswordModalOpen(false)}
            >
              취소
            </button>

            <button
              type="button"
              className="admin-profile-modal-confirm"
            >
              변경
            </button>
          </div>
        </div>
      </div>
    )}
    </header>
  );
}