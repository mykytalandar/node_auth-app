import './App.css';
import { HomePage } from './pages/HomePage';
import { Route, Routes, NavLink, useLocation } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { checkAuth } from './api/auth';

function App() {
  const { pathname } = useLocation();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchUserData() {
      const authUser = await checkAuth();

      if (authUser) {
        setUser(authUser);
      }
    }
    fetchUserData();
  }, [setUser]);

  return (
    <>
      <nav className="nav">
        <span className="nav-title">Auth application</span>
        <div className="nav-wrapper">
          <NavLink
            to="/"
            className={`nav-link ${pathname === '/' ? 'nav-link-active' : ''}`}
          >
            Home
          </NavLink>
          {user && (
            <NavLink
              to="/profile"
              className={`nav-link nav-link-profile ${pathname === '/profile' ? 'nav-link-active' : ''}`}
            >
              Profile Page
            </NavLink>
          )}

          {user ? (
            <button className="form-button">Log out</button>
          ) : (
            <>
              <NavLink
                to="/register"
                className={`nav-link ${pathname === '/register' ? 'nav-link-active' : ''}`}
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className={`nav-link ${pathname === '/login' ? 'nav-link-active' : ''}`}
              >
                Sign in
              </NavLink>
            </>
          )}
        </div>
      </nav>
      <div className="gradient-wrapper">
        <main className="main">
          <section className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Routes>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
