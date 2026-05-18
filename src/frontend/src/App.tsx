import './App.css';
import { HomePage } from './pages/HomePage';
import {
  Route,
  Routes,
  NavLink,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { checkAuth, logout } from './api/auth';
import { ActivationPage } from './pages/ActivationPage';
import { Loader } from './pages/components/Loader';
import { ResetPasswordForm } from './pages/ResetPasswordPage/ResetPasswordForm';
import { ResetPasswordPage } from './pages/ResetPasswordPage/ResetPasswordPage';

function App() {
  const { pathname } = useLocation();
  const { user, setUser, isLoading, setIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);
      try {
        const authUser = await checkAuth();

        if (authUser) {
          setUser(authUser);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, [setUser, setIsLoading]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };

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
            <button className="form-button" onClick={handleLogout}>
              Log out
            </button>
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
            {isLoading ? (
              <Loader />
            ) : (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route
                  path="login"
                  element={user ? <Navigate to="/profile" /> : <LoginPage />}
                />
                <Route
                  path="activation/:activationToken"
                  element={<ActivationPage />}
                />
                <Route
                  path="profile"
                  element={user ? <ProfilePage /> : <Navigate to="/login" />}
                />
                <Route
                  path="/forgot-password"
                  element={user ? <Navigate to="/login" /> : <ResetPasswordForm />}
                />
                <Route
                  path="/reset-password/:resetToken"
                  element={user ? <Navigate to="/" /> : <ResetPasswordPage />}
                />
              </Routes>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
