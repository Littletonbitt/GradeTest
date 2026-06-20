import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiFetch } from '../utils/api';

export default function TestSolve() {
  const { testId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await apiFetch(`http://localhost:5204/tests/${testId}`);
        if (!res.ok) throw new Error('Failed to fetch test');
        const data = await res.json();
        setTest(data);
        const initial = {};
        data.questions.forEach((_, idx) => { initial[idx] = []; });
        setAnswers(initial);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTest();
  }, [testId, user]);

  const handleAnswerChange = (questionIndex, answerIndex, isMultiple) => {
    if (submitted) return;
    setAnswers(prev => {
      const current = prev[questionIndex] || [];
      if (isMultiple) {
        const newVal = current.includes(answerIndex)
          ? current.filter(i => i !== answerIndex)
          : [...current, answerIndex];
        return { ...prev, [questionIndex]: newVal };
      } else {
        return { ...prev, [questionIndex]: [answerIndex] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let correctCount = 0;
    const results = test.questions.map((q, idx) => {
      const userAnsIndices = answers[idx] || [];
      const correctIndices = q.answers
        .map((a, i) => a.isCorrect ? i : -1)
        .filter(i => i !== -1);
      const isCorrect = userAnsIndices.length === correctIndices.length &&
                        userAnsIndices.every(v => correctIndices.includes(v));
      if (isCorrect) correctCount++;
      const userAnsText = userAnsIndices.length
        ? userAnsIndices.map(i => q.answers[i].text).join(', ')
        : 'не выбрано';
      const correctAnsText = correctIndices.length
        ? correctIndices.map(i => q.answers[i].text).join(', ')
        : 'не указано';
      return {
        userAnsIndices,
        correctIndices,
        isCorrect,
        userAnsText,
        correctAnsText
      };
    });

    setResult({ correctCount, total: test.questions.length, results });
    setSubmitted(true);

    setSaving(true);
    try {
      const attemptData = {
        testId: test.id,
        score: correctCount,
        totalQuestions: test.questions.length,
        answersJson: JSON.stringify(results) 
      };
      await apiFetch('http://localhost:5204/tests/attempt', {
        method: 'POST',
        body: JSON.stringify(attemptData)
      });
    } catch (err) {
      console.error('Failed to save attempt:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Загрузка теста...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!test) return <div>Тест не найден</div>;

  return (
    <main className="container py-5">
      <h1 className="display-6 fw-bold mb-4">{test.title}</h1>
      {submitted ? (
        <div className="alert alert-success">
          <h4>Результат: {result.correctCount} из {result.total}</h4>
          {result.results.map((r, idx) => (
            <div key={idx} className={r.isCorrect ? 'text-success' : 'text-danger'}>
              <strong>Вопрос {idx+1}:</strong> {r.isCorrect ? 'Правильно' : 'Неправильно'}
              <br />
              {!r.isCorrect && (
                <>
                  <span>Ваш ответ: {r.userAnsText}</span>
                  <br />
                  <span>Правильный ответ: {r.correctAnsText}</span>
                </>
              )}
              {r.isCorrect && (
                <span>Ваш ответ: {r.userAnsText}</span>
              )}
            </div>
          ))}
          {saving && <div className="text-muted mt-2">Сохранение результата...</div>}
          <button className="btn btn-primary mt-3" onClick={() => navigate('/profile')}>
            Вернуться к тестам
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {test.questions.map((q, qIdx) => (
            <div key={qIdx} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{qIdx+1}. {q.text}</h5>
                <div>
                  {q.answers.map((ans, aIdx) => {
                    const isChecked = answers[qIdx]?.includes(aIdx) || false;
                    const inputType = q.isMultiple ? 'checkbox' : 'radio';
                    const name = `question_${qIdx}`;
                    return (
                      <div className="form-check" key={aIdx}>
                        <input
                          className="form-check-input"
                          type={inputType}
                          name={name}
                          id={`q${qIdx}_a${aIdx}`}
                          value={aIdx}
                          checked={isChecked}
                          onChange={() => handleAnswerChange(qIdx, aIdx, q.isMultiple)}
                        />
                        <label className="form-check-label" htmlFor={`q${qIdx}_a${aIdx}`}>
                          {ans.text}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-primary btn-lg">Отправить ответы</button>
        </form>
      )}
    </main>
  );
}

