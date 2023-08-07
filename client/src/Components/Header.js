import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <div className="navbar">
    <span className="logo">
      <img src="https://thumbs.dreamstime.com/b/xyz-abstract-monogram-shield-logo-design-black-background-creative-initials-letter-275275355.jpg"
       alt="Logo" className="logoImage" />
      XYZ Motors
    </span>

      <ul className="list">
        <li className="listItem">
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated && (
          <li className="listItem">
            <Link to="/addrecord">Add New Record</Link>
          </li>
        )}
        <li className="userName">
          {isAuthenticated && <p>{user.name}</p>}
        </li>
        {isAuthenticated ? (
          <li className="listItem">
            <button
              className="button-21"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </button>
          </li>
        ) : (
          <li className="listItem">
            <button
              className="button-21"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
