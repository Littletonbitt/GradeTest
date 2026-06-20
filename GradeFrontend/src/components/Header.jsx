import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <header className="p-3 text-bg-dark">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 d-flex justify-content-center mb-md-0">
              <li className="d-flex align-items-center">
                <Link to="/" className="nav-link px-2 text-warning">
                  <i className="bi bi-clipboard-check fs-1"></i>
                </Link>
              </li>
              <li className="d-flex align-items-center">
                <Link to="/review" className="nav-link px-2 text-white">Отзывы</Link>
              </li>
              <li className="d-flex align-items-center">
                <Link to="/pricing" className="nav-link px-2 text-white">Цены</Link>
              </li>
              <li className="d-flex align-items-center">
                <Link to="/faq" className="nav-link px-2 text-white">Вопросы</Link>
              </li>
              <li className="d-flex align-items-center">
                <Link to="/about" className="nav-link px-2 text-white">О нас</Link>
              </li>
            </ul>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input
                type="search"
                className="form-control form-control-white text-bg-light"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
            <div className="text-end">
              <Link to="/login" className="btn btn-outline-light me-2">Войти</Link>
              <Link to="/signup" className="btn btn-warning">Зарегистрироваться</Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="p-3 text-bg-dark">
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <Link to="/profile" className="navbar-brand fw-bold text-warning">
            <i className="bi bi-clipboard-check me-2"></i>
            GradeTest
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/profile" className="nav-link px-2 text-white">Тесты</Link>
            </li>
            <li>
              <Link to="/results" className="nav-link px-2 text-white">Результаты</Link>
            </li>
            {user.role === 'Admin' && (
              <li>
                <Link to="/admin" className="nav-link px-2 text-warning">Админка</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link to="/testcreate" className="btn btn-outline-light btn-sm">
              <i className="bi bi-plus-circle me-1"></i>Создать тест
            </Link>
            <div className="dropdown">
              <div
                className="user-avatar"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-person-circle fs-3 text-light"></i>
              </div>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <Link to="/profile" className="dropdown-item">
                    <i className="bi bi-person-circle me-2"></i>Профиль
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Выйти
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

