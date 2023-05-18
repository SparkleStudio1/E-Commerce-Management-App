import "./header.css";
import { useEffect } from "react";

type HeaderProps = {
  handleSidebar: () => void;
  open: boolean;
  headerRef: React.RefObject<HTMLDivElement>;
  sidebarRef: React.RefObject<HTMLDivElement>;
};

function Header({ handleSidebar, open, headerRef, sidebarRef }: HeaderProps) {
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.width = `calc(100% - ${sidebarRef.current?.style.width})`;
    }
  }, [headerRef, sidebarRef, sidebarRef.current?.style.width]);

  return (
    <div
      className="header d-flex justify-content-between align-items-center"
      ref={headerRef}
    >
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="sidebar-toggler d-flex justify-content-center align-items-center"
          onClick={handleSidebar}
        >
          <img
            src="/assets/icons/arrow-right-s-line.svg"
            className={`sidebar-toggler-arrow ${open ? "opened" : ""}`}
            alt="sidebar-toggler-arrow-icon"
          />
        </div>
        <div className="greet d-flex flex-column justify-content-center">
          <h3>Welcome back, Akaki 👋</h3>
          <p>Here's What's happening with your store today.</p>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="search-bar">
          <img src="/assets/icons/search.svg" alt="search-icon" />
        </div>
        <div className="profile">
          <img src="/assets/images/profile.png" alt="profile-img" />
        </div>
      </div>
    </div>
  );
}

export default Header;
