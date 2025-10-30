
import React from 'react';
import './Header.css';

interface HeaderProps {
  onAdminToggle: () => void;
  showAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ onAdminToggle, showAdmin }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <div className="star-of-david">✡</div>
          <h1 className="synagogue-name">Temple Beth Shalom</h1>
        </div>
        
        <nav className="header-nav">
          <a href="#bulletin" className="nav-link">Announcements</a>
          <a href="#events" className="nav-link">Events</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button 
            className={`admin-toggle ${showAdmin ? 'active' : ''}`}
            onClick={onAdminToggle}
            title="Toggle Admin Panel"
          >
            ⚙️
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
