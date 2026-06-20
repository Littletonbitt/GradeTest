import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiFetch } from '../utils/api';
import { Link } from 'react-router-dom';

export default function Results() {
    const { user } = useAuth();
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await apiFetch('http://localhost:5204/results');
                if (!res.ok) throw new Error('Failed to fetch results');
                const data = await res.json();
                setAttempts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchResults();
    }, [user]);

    if (loading) return <div className="text-center py-5">Загрузка...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    const totalAttempts = attempts.length;
    const avgScore = totalAttempts > 0
        ? (attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts).toFixed(1)
        : '—';
    const highestScore = totalAttempts > 0
        ? Math.max(...attempts.map(a => a.score))
        : '—';
    const lastAttempt = totalAttempts > 0 ? attempts[0] : null;

    return (
        <main className="container py-5">
            <h1 className="display-5 fw-bold mb-4">Мои результаты</h1>

            <div className="row g-4 mb-5">
                <div className="col-md-3">
                    <div className="bg-light p-4 rounded-4 shadow-sm text-center">
                        <h3 className="display-6 fw-bold">{totalAttempts}</h3>
                        <p className="text-muted">Всего пройдено</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bg-light p-4 rounded-4 shadow-sm text-center">
                        <h3 className="display-6 fw-bold">{avgScore}</h3>
                        <p className="text-muted">Средний балл</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bg-light p-4 rounded-4 shadow-sm text-center">
                        <h3 className="display-6 fw-bold">{highestScore}</h3>
                        <p className="text-muted">Лучший результат</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bg-light p-4 rounded-4 shadow-sm text-center">
                        <h3 className="display-6 fw-bold">
                            {lastAttempt ? `${lastAttempt.score}/${lastAttempt.totalQuestions}` : '—'}
                        </h3>
                        <p className="text-muted">Последний тест</p>
                    </div>
                </div>
            </div>

            {attempts.length === 0 ? (
                <div className="text-center py-5 text-muted">
                    <i className="bi bi-inbox display-1 d-block mb-3"></i>
                    <p>Пока нет сохранённых результатов. Пройдите любой тест, чтобы они появились здесь.</p>
                    <Link to="/profile" className="btn btn-primary">Перейти к тестам</Link>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Тест</th>
                                <th>Результат</th>
                                <th>Дата</th>
                                <th>Детали</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attempts.map(attempt => (
                                <tr key={attempt.id}>
                                    <td>
                                        <Link to={`/test/${attempt.testId}`} className="text-decoration-none">
                                            {attempt.testId} 
                                        </Link>
                                    </td>
                                    <td>
                                        <span className={`badge ${attempt.score === attempt.totalQuestions ? 'bg-success' : 'bg-primary'}`}>
                                            {attempt.score} / {attempt.totalQuestions}
                                        </span>
                                    </td>
                                    <td>{new Date(attempt.completedAt).toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-info"
                                            onClick={() => {
                                                if (attempt.answersJson) {
                                                    const details = JSON.parse(attempt.answersJson);
                                                    alert(JSON.stringify(details, null, 2));
                                                }
                                            }}
                                        >
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}



