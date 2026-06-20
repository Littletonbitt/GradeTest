import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiFetch } from '../utils/api';

export default function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tests');
  const [tests, setTests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingTests, setLoadingTests] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);

  const fetchTests = async () => {
    setLoadingTests(true);
    setError(null);
    try {
      const res = await apiFetch('http://localhost:5204/admin/tests');
      if (!res.ok) throw new Error('Failed to fetch tests');
      const data = await res.json();
      setTests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingTests(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setError(null);
    try {
      const res = await apiFetch('http://localhost:5204/admin/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  const deleteTest = async (id) => {
    if (!window.confirm('Удалить этот тест?')) return;
    try {
      const res = await apiFetch(`http://localhost:5204/admin/tests/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete test');
      setTests(tests.filter(t => t.id !== id));
    } catch (err) {
      alert('Ошибка удаления: ' + err.message);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Удалить этого пользователя?')) return;
    try {
      const res = await apiFetch(`http://localhost:5204/admin/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert('Ошибка удаления: ' + err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTests();
      fetchUsers();
    }
  }, [user]);

  return (
    <main className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <i className="bi bi-shield-lock-fill fs-1 text-primary"></i>
        <h1 className="display-5 fw-bold">Панель администратора</h1>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            <i className="bi bi-file-text me-2"></i>
            Тесты
            <span className="badge bg-secondary ms-2">{tests.length}</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="bi bi-people me-2"></i>
            Пользователи
            <span className="badge bg-secondary ms-2">{users.length}</span>
          </button>
        </li>
      </ul>

      {activeTab === 'tests' && (
        <div>
          {loadingTests ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            </div>
          ) : tests.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox display-1 d-block mb-3"></i>
              <p>Тесты не найдены</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Вопросов</th>
                    <th>Создан</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map(test => (
                    <tr key={test.id}>
                      <td>{test.id}</td>
                      <td>{test.title}</td>
                      <td>{test.questions?.length || 0}</td>
                      <td>{test.createdAt ? new Date(test.createdAt).toLocaleDateString() : '—'}</td>
                      <td>
                        <Link to={`/test/${test.id}`} className="btn btn-sm btn-outline-primary me-1">
                          <i className="bi bi-eye"></i>
                        </Link>
                        <Link to={`/admin/tests/${test.id}/edit`} className="btn btn-sm btn-outline-secondary me-1">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTest(test.id)}>
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          {loadingUsers ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-people display-1 d-block mb-3"></i>
              <p>Пользователи не найдены</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Роль</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.nickName || '—'}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td>
                        <Link to={`/admin/users/${user.id}/edit`} className="btn btn-sm btn-outline-secondary me-1">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(user.id)}>
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

