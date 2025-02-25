// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavToggle = () => setIsNavOpen(!isNavOpen);

  // Funcție de logout: șterge token-ul și redirecționează
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Verificăm dacă utilizatorul este autentificat
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      {/* Stiluri inline pentru butoanele din header și efectele de animație */}
      <style>
        {`
          /* Animația pentru deschiderea meniului mobil */
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          /* Butoane desktop */
          .btn-custom {
            background-color: #1e88e5 !important;
            color: #fff !important;
            border: none !important;
            border-radius: 12px;
            padding: 8px 16px;
            transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          }
          .btn-custom:hover {
            background-color: #1565c0 !important;
            transform: scale(1.03);
            box-shadow: 0 0 10px rgba(21, 101, 192, 0.7);
          }
          .btn-logout {
            background-color: #f44336 !important;
            color: #fff !important;
            border: none !important;
            border-radius: 12px;
            padding: 8px 16px;
            transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          }
          .btn-logout:hover {
            background-color: #d32f2f !important;
            transform: scale(1.03);
            box-shadow: 0 0 10px rgba(211, 47, 47, 0.7);
          }
          /* Butoane mobile */
          .btn-lg-custom {
            background-color: #1e88e5 !important;
            color: #fff !important;
            border: none !important;
            border-radius: 12px;
            padding: 12px 24px;
            transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          }
          .btn-lg-custom:hover {
            background-color: #1565c0 !important;
            transform: scale(1.03);
            box-shadow: 0 0 10px rgba(21, 101, 192, 0.7);
          }
          .btn-lg-logout {
            background-color: #f44336 !important;
            color: #fff !important;
            border: none !important;
            border-radius: 12px;
            padding: 12px 24px;
            transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          }
          .btn-lg-logout:hover {
            background-color: #d32f2f !important;
            transform: scale(1.03);
            box-shadow: 0 0 10px rgba(211, 47, 47, 0.7);
          }
          /* Stil pentru butonul de închidere a meniului mobil */
          .close-menu-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #fff;
          }
        `}
      </style>
      <header style={{ position: "relative", zIndex: 1000 }}>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-primary"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <span className="me-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-journal-text"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 8h6v1H5V8zm0-2h6v1H5V6zm0-2h6v1H5V4zm7 0h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1v-1h1V5H5v9h1v1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7z" />
                  <path d="M3 1h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3z" />
                </svg>
              </span>
              Note App
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              aria-label="Toggle navigation"
              onClick={handleNavToggle}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* Meniul inline pentru ecrane mari */}
            <div className="ms-auto d-none d-lg-flex gap-2">
              <Link className="btn btn-custom" to="/">
                Home
              </Link>
              <Link className="btn btn-custom" to="/new">
                New Note
              </Link>
              {isLoggedIn && (
                <button className="btn btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Meniul full-screen pentru dispozitive mobile */}
        {isNavOpen && (
          <div
            className="mobile-nav-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "#0d1b2a", // fundal solid
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              animation: "slideDown 0.5s ease-out",
            }}
          >
            <IconButton onClick={handleNavToggle} className="close-menu-btn">
              <CloseIcon fontSize="large" />
            </IconButton>
            <Link
              className="btn btn-lg-custom mb-3"
              to="/"
              onClick={handleNavToggle}
              style={{ width: "80%", maxWidth: "300px" }}
            >
              Home
            </Link>
            <Link
              className="btn btn-lg-custom mb-3"
              to="/new"
              onClick={handleNavToggle}
              style={{ width: "80%", maxWidth: "300px" }}
            >
              New Note
            </Link>
            {isLoggedIn && (
              <button
                className="btn btn-lg-logout"
                onClick={() => {
                  handleLogout();
                  handleNavToggle();
                }}
                style={{ width: "80%", maxWidth: "300px" }}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
