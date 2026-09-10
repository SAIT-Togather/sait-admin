export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="admin-footer">
      <div className="admin-footer-left">
        © {currentYear} SAIT. All rights reserved.
      </div>

      <div className="admin-footer-right">
        <span>개인정보처리방침</span>
        <span>이용약관</span>
      </div>
    </footer>
  );
}