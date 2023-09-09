import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn =
    location.pathname !== "/login" && location.pathname !== "/register";

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, you can clear user session or remove authentication tokens

    // Assuming you're using localStorage for storing authentication tokens
    localStorage.removeItem("authToken");

    // Redirect the user to the login page after logout
    navigate("/login");
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-white">
                Home
              </Link>
            </li>
          </ul>
          <div className="text-end">
            {isLoggedIn ? (
              <>
                <button
                  className="btn btn-outline-light me-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline-light">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
