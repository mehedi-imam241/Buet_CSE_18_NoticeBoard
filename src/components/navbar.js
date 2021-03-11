import { Link } from "react-router-dom";
import "./navbar.css";
import { tokenContext } from "../context/tokenProvider";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const [token, setToken] = useContext(tokenContext);
  const history = useHistory();

  const [position, setPosition] = useState("All Notices");

  const handleLogout = (e) => {
    e.preventDefault();
    setToken("");
    setPosition("Logout");
    sessionStorage.clear();
    // window.location.reload();
    history.push("/", null);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div>
          <ul>
            <li>
              <Link
                to="/"
                className={position === "All Notices" ? "current" : null}
                onClick={() => {
                  setPosition("All Notices");
                }}
              >
                All Notices
              </Link>
            </li>

            {token ? (
              <li>
                <Link
                  to="/createNew"
                  className={position === "Create/Update" ? "current" : null}
                  onClick={() => {
                    setPosition("Create/Update");
                  }}
                >
                  Create/Update
                </Link>
              </li>
            ) : (
              <li></li>
            )}

            <li>
              <Link
                to="/developer"
                className={position === "Developer" ? "current" : null}
                onClick={() => {
                  setPosition("Developer");
                }}
              >
                Developer
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            {token ? (
              <li>
                <Link
                  to="/"
                  className={position === "Logout" ? "current" : null}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className={position === "Login" ? "current" : null}
                  onClick={() => {
                    setPosition("Login");
                  }}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
