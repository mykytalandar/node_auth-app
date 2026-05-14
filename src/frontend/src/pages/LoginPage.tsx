import { useContext, useState } from 'react';
import type { LoginFormErrors } from '../types/FormErrors';
import { validateValues } from '../utils/validateValues.ts';
import { login } from '../api/auth.ts';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.tsx';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<LoginFormErrors>({
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState('');
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setServerError('');

      const data = await login({
        email,
        password,
      });

      if (data) {
        setUser(data);
      }

      setEmail('');
      setPassword('');

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      }

      return false;
    }
  };

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const newErrors: LoginFormErrors = {
      email: validateValues.email(email),
      password: validateValues.password(password),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      setServerError('');
      return;
    }

    const success = await handleLogin();

    if (success) {
      navigate('/profile');
    }
  };

  return (
    <div className="form-wrapper background-white">
      <h2 className="title">Sign in</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="notification">{errors.email}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="notification">{errors.password}</p>}
          {serverError && <p className="notification">{serverError}</p>}
        </div>
        <div className="button-error-container">
          <button type="submit" className="form-button">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};
