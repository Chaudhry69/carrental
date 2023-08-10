import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated, logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="navbar">
      <span className="logo">
        <img
          src="https://thumbs.dreamstime.com/b/xyz-abstract-monogram-shield-logo-design-black-background-creative-initials-letter-275275355.jpg"
          alt="Logo"
          className="logoImage"
        />
        XYZ Motors
      </span>

      <ul className="list">
        <li className="listItem">
          <Link to="/list">Home</Link>
        </li>
        <li className="listItem">
          <Link to="/addrecord">Add New Record</Link>
        </li>
        {isAuthenticated ? (
          <li className="listItem">
            <button className="button-21" onClick={handleLogout}>
              Log Out
            </button>
          </li>
        ) : (
          <li className="listItem">
            <button className="button-21">
              <Link to="/">Login</Link>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
