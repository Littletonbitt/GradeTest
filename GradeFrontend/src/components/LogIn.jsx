import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function LogIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error || 'Неверный логин или пароль');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="d-flex justify-content-center w-100 bg-light rounded-4" style={{ maxWidth: "500px", maxHeight: "600px" }}>
        <div className="form-signin" style={{ maxWidth: "400px" }}>
          <form onSubmit={handleSend}>
            <div className="text-center mb-4 mt-4">
              <i className="bi bi-file-text-fill display-1 text-primary"></i>
              <h1 className="h3 mb-3 fw-normal flame-gradient-text">GradeTest</h1>
              <p className="text-muted">Войдите, чтобы создавать, проверять и показывать ответы</p>
            </div>
            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                value={email}
                placeholder="name@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email адрес</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                value={password}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Пароль</label>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-check text-start my-3">
              <input className="form-check-input" type="checkbox" id="checkDefault" />
              <label className="form-check-label" htmlFor="checkDefault">Запомнить меня</label>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <Link to="/reset" className="text-decoration-none small">Забыли пароль?</Link>
              <Link to="/signup" className="text-decoration-none small">Регистрация</Link>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit" id="button-sign">
              <i className="bi bi-box-arrow-in-right me-2"></i>Войти
            </button>
            <p className="mt-5 mb-3 text-body-secondary text-center small">© 2025 GradeTest. Все права защищены.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;

