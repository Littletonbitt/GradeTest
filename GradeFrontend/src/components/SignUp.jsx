import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    floatingName: '',
    floatingEmail: '',
    floatingPassword: '',
    floatingConfirmPassword: '',
    agreeTerms: false,
  });

  const handleInput = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const isPasswordTooShort = formData.floatingPassword.length > 0 && formData.floatingPassword.length < 8;
  const isPasswordsMatch = formData.floatingPassword === formData.floatingConfirmPassword;
  const isConfirmNotEmpty = formData.floatingConfirmPassword.length > 0;

  const isSubmitEnabled = formData.agreeTerms &&
    formData.floatingName.trim() !== '' &&
    formData.floatingEmail.trim() !== '' &&
    formData.floatingPassword.trim() !== '' &&
    isPasswordsMatch &&
    !isPasswordTooShort;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      NickName: formData.floatingName.trim(),
      Email: formData.floatingEmail.trim(),
      Password: formData.floatingPassword.trim()
    };

    try {
      const response = await fetch('http://localhost:5204/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('[SUCCESS]: ', data);
        navigate('/login');
      } else {
        const err = await response.json();
        console.error('Server error:', err.message || response.statusText);
        alert('Ошибка регистрации: ' + (err.message || 'Попробуйте снова'));
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Ошибка сети. Попробуйте позже.');
    }
  };

  return (
    <main className="form-signup m-auto">
      <form id="signupForm" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <i className="bi bi-file-text-fill display-1 text-primary"></i>
          <h1 className="h3 mb-3 fw-normal flame-gradient-text">GradeTest</h1>
          <p className="text-muted">Создайте аккаунт, чтобы начать работу с тестами</p>
        </div>
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Имя и фамилия"
            value={formData.floatingName}
            onChange={handleInput}
            required
          />
          <label htmlFor="floatingName">Имя</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
            value={formData.floatingEmail}
            onChange={handleInput}
            required
            autoComplete="example@user.com"
          />
          <label htmlFor="floatingEmail">Email адрес</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="password"
            className={`form-control ${isPasswordTooShort ? 'is-invalid' : ''}`}
            id="floatingPassword"
            placeholder="Пароль"
            value={formData.floatingPassword}
            onChange={handleInput}
            required
            autoComplete="new-password"
          />
          <label htmlFor="floatingPassword">Пароль</label>
          {isPasswordTooShort && (
            <div className="password-strength" id="passwordStrength">
              <small>Слабый пароль (минимум 8 символов)</small>
            </div>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${!isPasswordsMatch ? 'is-invalid' : ''}`}
            id="floatingConfirmPassword"
            placeholder="Подтвердите пароль"
            value={formData.floatingConfirmPassword}
            onChange={handleInput}
            required
            autoComplete="new-password"
          />
          <label htmlFor="floatingConfirmPassword">Подтвердите пароль</label>
          {!isPasswordsMatch && isConfirmNotEmpty && (
            <div className="invalid-feedback" id="confirmFeedback">Пароли не совпадают</div>
          )}
        </div>
        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="agreeTerms"
            onChange={handleInput}
            required
            checked={formData.agreeTerms}
          />
          <label className="form-check-label" htmlFor="agreeTerms">
            Я принимаю <a href="#" className="text-decoration-none">условия использования </a> и
            <a href="#" className="text-decoration-none">политику конфиденциальности</a>
          </label>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <a href="#" className="text-decoration-none small">Уже есть аккаунт? Войти</a>
        </div>
        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          id="button-signup"
          disabled={!isSubmitEnabled}
        >
          <i className="bi bi-person-plus-fill me-2"></i>Зарегистрироваться
        </button>
      </form>
    </main>
  );
}


