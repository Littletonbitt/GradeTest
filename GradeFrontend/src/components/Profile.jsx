import './css/Profile.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiFetch } from '../utils/api';

export default function Profile() {
  const { user } = useAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await apiFetch('http://localhost:5204/tests');
        if (!res.ok) throw new Error('Failed to fetch tests');
        const data = await res.json();
        setTests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTests();
  }, [user]);

  const todayTest = tests.length > 0 ? tests[0] : null;

  return (
    <>
      <div className="container py-4">
        {todayTest ? (
          <div className="today-test">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="text-muted small mb-1">
                  <i className="bi bi-calendar-event me-1"></i>Сегодня
                </div>
                <div className="test-name">{todayTest.title}</div>
                <div className="test-desc mt-2">
                  {todayTest.questions?.length || 0} вопросов
                </div>
                <Link to={`/test/${todayTest.id}`} className="btn btn-outline-primary btn-sm mt-2">
                  Пройти тестирование
                </Link>
              </div>
              <div className="col-md-4 text-end">
                <span className="badge bg-warning bg-opacity-25 text-dark p-2">
                  <i className="bi bi-clock me-1"></i>
                  {todayTest.questions?.length || 0} вопросов
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-info">
            У вас пока нет тестов. <Link to="/testcreate">Создайте первый тест</Link>
          </div>
        )}

        <h2 className="h4 mb-3">Мои тесты</h2>

        {loading && <div className="text-center py-4">Загрузка...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row row-cols-1 row-cols-md-3 g-4" id="testGrid">
          {!loading && tests.length === 0 && (
            <div className="col-12 text-center text-muted py-4">
              <i className="bi bi-inbox display-3 d-block mb-3"></i>
              <p>У вас пока нет созданных тестов.</p>
              <Link to="/testcreate" className="btn btn-primary">Создать тест</Link>
            </div>
          )}
          {tests.map(test => (
            <div className="col" key={test.id}>
              <div className="test-card">
                <div
                  className="card-top"
                  style={{
                    background: `linear-gradient(135deg, #${Math.floor(
                      Math.random() * 16777215
                    ).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})`,
                  }}
                >
                  <h5>{test.title}</h5>
                  <small>{test.questions?.length || 0} вопросов</small>
                </div>
                <div className="card-body">
                  <div className="description">
                    Тест содержит {test.questions?.length || 0} вопросов.
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <Link
                      to={`/test/${test.id}/edit`}
                      className="badge bg-light text-dark text-decoration-none"
                    >
                      <i className="bi bi-pencil me-1"></i>редактировать
                    </Link>
                    <span className="text-muted small">
                      <i className="bi bi-eye me-1"></i>
                      {test.questions?.length || 0} вопросов
                    </span>
                    <Link to={`/test/${test.id}`} className="btn btn-sm btn-outline-primary">
                      Пройти
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && tests.length > 0 && (
          <p className="text-muted text-center mt-4 small">Всего тестов: {tests.length}</p>
        )}
      </div>

      <button
        className="fab"
        data-bs-toggle="tooltip"
        title="Добавить функцию (скоро)"
        onClick={() => window.location.href = '/testcreate'}
      >
        <i className="bi bi-plus-lg"></i>
      </button>
    </>
  );
}

