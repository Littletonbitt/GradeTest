import { useState, useEffect } from 'react';
import './css/Main.css';

function escapeHtml(str) {
        if (!str) return "";
        return str.replace(/[&<>]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
        });
}

export default function Main() {
        const [tests, setTests] = useState([]);
        const [nextId, setNextId] = useState(1);

        const [builderTitle, setBuilderTitle] = useState('');
        const [questions, setQuestions] = useState([]);

        const [selectedVerifyTestId, setSelectedVerifyTestId] = useState('');
        const [verifyAnswers, setVerifyAnswers] = useState({});
        const [verifyResult, setVerifyResult] = useState(null);

        const [selectedAnswerTestId, setSelectedAnswerTestId] = useState('');
        const [showAnswers, setShowAnswers] = useState(false);

        useEffect(() => {
                const demoTests = [
                        {
                                id: 1,
                                title: "География: столицы",
                                questions: [
                                        {
                                                text: "Столица Франции?",
                                                answers: ["Берлин", "Мадрид", "Париж", "Лиссабон"],
                                                correct: [2],
                                                isMultiple: false,
                                        },
                                        {
                                                text: "Столица Японии?",
                                                answers: ["Сеул", "Пекин", "Токио", "Бангкок"],
                                                correct: [2],
                                                isMultiple: false,
                                        },
                                        {
                                                text: "Столица Канады?",
                                                answers: ["Торонто", "Оттава", "Ванкувер", "Монреаль"],
                                                correct: [1],
                                                isMultiple: false,
                                        },
                                ],
                        },
                        {
                                id: 2,
                                title: "JavaScript Основы",
                                questions: [
                                        {
                                                text: "Как объявить переменную в JS?",
                                                answers: ["var", "let", "const", "Все варианты"],
                                                correct: [3],
                                                isMultiple: false,
                                        },
                                        {
                                                text: "Что выведет typeof null?",
                                                answers: ["null", "object", "undefined", "number"],
                                                correct: [1],
                                                isMultiple: false,
                                        },
                                ],
                        },
                ];
                setTests(demoTests);
                setNextId(3);
        }, []);
        

	const addQuestion = () => {
                setQuestions([
                        ...questions,
                        {
                                id: Date.now() + Math.random(),
                                text: '',
                                answers: ['', ''],
                                isMultiple: false,
                                correctIndices: [],
                        },
                ]);
        };

        const removeQuestion = (qId) => {
                setQuestions(questions.filter(q => q.id !== qId));
        };

        const updateQuestionText = (qId, text) => {
                setQuestions(questions.map(q =>
                        q.id === qId ? { ...q, text } : q
                ));
        };

        const addAnswer = (qId) => {
                setQuestions(questions.map(q =>
                        q.id === qId ? { ...q, answers: [...q.answers, ''] } : q
                ));
        };

        const removeAnswer = (qId, idx) => {
                setQuestions(questions.map(q => {
                        if (q.id !== qId) return q;
                        const newAnswers = q.answers.filter((_, i) => i !== idx);
                        const newCorrect = q.correctIndices
                                .filter(i => i !== idx)
                                .map(i => i > idx ? i - 1 : i);
                        return { ...q, answers: newAnswers, correctIndices: newCorrect };
                }));
        };

        const updateAnswerText = (qId, idx, text) => {
                setQuestions(questions.map(q =>
                        q.id === qId
                                ? { ...q, answers: q.answers.map((a, i) => i === idx ? text : a) }
                                : q
                ));
        };

        const toggleMultiple = (qId) => {
                setQuestions(questions.map(q =>
                        q.id === qId ? { ...q, isMultiple: !q.isMultiple, correctIndices: [] } : q
                ));
        };

        const toggleCorrect = (qId, idx) => {
                setQuestions(questions.map(q => {
                        if (q.id !== qId) return q;
                        if (q.isMultiple) {
                                const set = new Set(q.correctIndices);
                                if (set.has(idx)) set.delete(idx);
                                else set.add(idx);
                                return { ...q, correctIndices: Array.from(set).sort() };
                        } else {
                                return { ...q, correctIndices: q.correctIndices[0] === idx ? [] : [idx] };
                        }
                }));
        };

        const saveTest = () => {
                if (!builderTitle.trim() || questions.length === 0) {
                        alert('Введите название теста и добавьте хотя бы один вопрос.');
                        return;
                }
                for (const q of questions) {
                        if (!q.text.trim()) {
                                alert('Все вопросы должны иметь текст.');
                                return;
                        }
                        if (q.answers.length < 2) {
                                alert('Каждый вопрос должен иметь минимум два варианта ответа.');
                                return;
                        }
                        if (q.correctIndices.length === 0) {
                                alert('Для каждого вопроса укажите правильный ответ (выделите его).');
                                return;
                        }
                        for (const ans of q.answers) {
                                if (!ans.trim()) {
                                        alert('Все варианты ответов должны быть заполнены.');
                                        return;
                                }
                        }
                }
                const newTest = {
                        id: nextId,
                        title: builderTitle.trim(),
                        questions: questions.map(q => ({
                                text: q.text.trim(),
                                answers: q.answers.map(a => a.trim()),
                                correct: q.correctIndices,
                                isMultiple: q.isMultiple,
                        })),
                };
                setTests([...tests, newTest]);
                setNextId(nextId + 1);
                setBuilderTitle('');
                setQuestions([]);
                alert('Тест сохранён!');
        };

        const resetBuilder = () => {
                if (window.confirm('Очистить все введённые данные?')) {
                        setBuilderTitle('');
                        setQuestions([]);
                }
        };

        const handleVerifySelect = (e) => {
                const id = Number(e.target.value);
                setSelectedVerifyTestId(id);
                setVerifyAnswers({});
                setVerifyResult(null);
        };

        const handleVerifyAnswerChange = (qIdx, ansIdx) => {
                setVerifyAnswers(prev => {
                        const test = tests.find(t => t.id === selectedVerifyTestId);
                        if (!test) return prev;
                        const question = test.questions[qIdx];
                        if (question.isMultiple) {
                                const current = prev[qIdx] || [];
                                const set = new Set(current);
                                if (set.has(ansIdx)) set.delete(ansIdx);
                                else set.add(ansIdx);
                                return { ...prev, [qIdx]: Array.from(set).sort() };
                        } else {
                                return { ...prev, [qIdx]: [ansIdx] };
                        }
                });
        };

	const submitVerify = () => {
    		const test = tests.find(t => t.id === selectedVerifyTestId);
    		if (!test) return;
    
		let correctCount = 0;
    		const total = test.questions.length;
    		const results = test.questions.map((q, idx) => {
        		const userAns = verifyAnswers[idx] || [];
        		const ansList = q.answers || q.options || [];
        		const correctArr = Array.isArray(q.correct) ? q.correct : [q.correct];
        		const isCorrect = userAns.length === correctArr.length && 
				userAns.every(v => correctArr.includes(v));
        		if (isCorrect) correctCount++;
        
			const userAnsText = userAns.length ? userAns.map(i => ansList[i]).join(', ') : 'не выбран';
			const correctText = correctArr.map(i => ansList[i]).join(', ');
        		return { userAns, correct: correctArr, isCorrect, userAnsText, correctText };
    		});
    		setVerifyResult({ correctCount, total, results });
	};
	
        const handleAnswerSelect = (e) => {
                setSelectedAnswerTestId(Number(e.target.value));
                setShowAnswers(false);
        };

        const showAnswersHandler = () => {
                setShowAnswers(true);
        };

        const renderBuilderQuestion = (q, qIdx) => {
                return (
                        <div key={q.id} className="card mb-3 builder-question">
                                <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start">
                                                <input
                                                        type="text"
                                                        className="form-control mb-2"
                                                        placeholder={`Вопрос ${qIdx + 1}`}
                                                        value={q.text}
                                                        onChange={(e) => updateQuestionText(q.id, e.target.value)}
                                                />
                                                <button
                                                        className="btn btn-sm btn-outline-danger ms-2"
                                                        onClick={() => removeQuestion(q.id)}
                                                >
                                                        <i className="bi bi-x-lg"></i>
                                                </button>
                                        </div>
                                        <div className="mb-2">
                                                <div className="form-check form-check-inline">
                                                        <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name={`qtype-${q.id}`}
                                                                id={`single-${q.id}`}
                                                                checked={!q.isMultiple}
                                                                onChange={() => toggleMultiple(q.id)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`single-${q.id}`}>
                                                                Один ответ
                                                        </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                        <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name={`qtype-${q.id}`}
                                                                id={`multi-${q.id}`}
                                                                checked={q.isMultiple}
                                                                onChange={() => toggleMultiple(q.id)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`multi-${q.id}`}>
                                                                Несколько ответов
                                                        </label>
                                                </div>
                                        </div>
                                        <ul className="list-unstyled">
                                                {q.answers.map((ans, idx) => {
                                                        const isCorrect = q.correctIndices.includes(idx);
                                                        const selectorType = q.isMultiple ? 'checkbox' : 'radio';
                                                        return (
                                                                <li key={idx} className="d-flex align-items-center mb-1">
                                                                        <div className="me-2">
                                                                                <input
                                                                                        className="form-check-input"
                                                                                        type={selectorType}
                                                                                        checked={isCorrect}
                                                                                        onChange={() => toggleCorrect(q.id, idx)}
                                                                                />
                                                                        </div>
                                                                        <input
                                                                                type="text"
                                                                                className="form-control form-control-sm"
                                                                                placeholder={`Вариант ${idx + 1}`}
                                                                                value={ans}
                                                                                onChange={(e) => updateAnswerText(q.id, idx, e.target.value)}
                                                                        />
                                                                        <button
                                                                                className="btn btn-sm btn-outline-secondary ms-2"
                                                                                onClick={() => removeAnswer(q.id, idx)}
                                                                                disabled={q.answers.length <= 2}
                                                                        >
                                                                                <i className="bi bi-dash"></i>
                                                                        </button>
                                                                </li>
                                                        );
                                                })}
                                        </ul>
                                        <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => addAnswer(q.id)}
                                        >
                                                <i className="bi bi-plus-circle"></i> Добавить ответ
                                        </button>
                                </div>
                        </div>
                );
        };
        const renderVerifyQuestion = (q, qIdx) => {
                const userAns = verifyAnswers[qIdx] || [];
                return (
                        <div key={qIdx} className="mb-3">
                                <p className="fw-semibold">{qIdx + 1}. {q.text}</p>
                                <ul className="list-unstyled">
                                        {q.answers.map((ans, idx) => {
                                                const checked = q.isMultiple ? userAns.includes(idx) : userAns[0] === idx;
                                                const inputType = q.isMultiple ? 'checkbox' : 'radio';
                                                return (
                                                        <li key={idx} className="mb-1">
                                                                <div className="form-check">
                                                                        <input
                                                                                className="form-check-input"
                                                                                type={inputType}
                                                                                name={`verify-${qIdx}`}
                                                                                value={idx}
                                                                                checked={checked}
                                                                                onChange={() => handleVerifyAnswerChange(qIdx, idx)}
                                                                        />
                                                                        <label className="form-check-label">{ans}</label>
                                                                </div>
                                                        </li>
                                                );
                                        })}
                                </ul>
                        </div>
                );
        };
        const renderAnswerDisplay = (test) => {
                if (!test) return <p>Выберите тест.</p>;
                return (
                        <div>
                                <h6 className="mb-3">Правильные ответы для «{test.title}»</h6>
                                {test.questions.map((q, idx) => (
                                        <div key={idx} className="mb-2">
                                                <strong>{idx + 1}. {q.text}</strong>
                                                <ul className="list-unstyled ms-3">
                                                        {q.answers.map((ans, aIdx) => (
                                                                <li key={aIdx} className={q.correct.includes(aIdx) ? 'text-success fw-semibold' : ''}>
                                                                        {q.correct.includes(aIdx) ? '✓ ' : ''}{ans}
                                                                </li>
                                                        ))}
                                                </ul>
                                        </div>
                                ))}
                        </div>
                );
        };
        return (
                <main className="container my-5">
                        <div className="text-center mb-5 p-4 bg-white rounded-4 shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
                                <h1 className="display-5 fw-bold">
                                        Создавай, проверяй и <span className="flame-gradient-text">показывай ответы</span> мгновенно
                                </h1>
                                <p className="lead text-muted mt-3">
                                        GradeTest — удобный инструмент для преподавателей и студентов.
                                        Легко создавайте тесты, проверяйте знания и демонстрируйте правильные ответы за секунды.
                                </p>
                                <div className="mt-3">
                                        <i className="bi bi-pencil-square fs-2 me-3 text-primary"></i>
                                        <i className="bi bi-check-circle-fill fs-2 me-3 text-success"></i>
                                        <i className="bi bi-eye-fill fs-2 text-info"></i>
                                </div>
                        </div>
                        <div className="row g-4">
                                <div className="col-lg-5" id="create">
                                        <div className="card border-0 shadow-sm h-100">
                                                <div className="card-body p-4">
                                                        <div className="d-flex align-items-center gap-2 mb-3">
                                                                <i className="bi bi-file-plus fs-3 text-primary"></i>
                                                                <h2 className="h4 mb-0 fw-bold">Создать тест</h2>
                                                        </div>
                                                        <div className="bg-light rounded-3 p-2 mb-3">
                                                                <span className="small text-muted">
                                                                        <i className="bi bi-collection"></i> Мои тесты:
                                                                </span>
                                                                <div className="d-flex flex-wrap gap-2 mt-2">
                                                                        {tests.map(t => (
                                                                                <span key={t.id} className="badge bg-primary bg-opacity-10 text-dark p-2">
                                                                                        {t.title} (ID: {t.id})
                                                                                </span>
                                                                        ))}
                                                                        {tests.length === 0 && <small className="text-muted">Нет сохранённых тестов</small>}
                                                                </div>
                                                        </div>
                                                        <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                placeholder="Название теста (например, 'Основы JS')"
                                                                value={builderTitle}
                                                                onChange={(e) => setBuilderTitle(e.target.value)}
                                                        />
                                                        <div className="mb-3" style={{ maxHeight: '460px', overflowY: 'auto' }}>
                                                                {questions.map((q, idx) => renderBuilderQuestion(q, idx))}
                                                                {questions.length === 0 && (
                                                                        <div className="text-muted text-center py-3">
                                                                                <i className="bi bi-plus-circle"></i> Нажмите «Добавить вопрос»
                                                                        </div>
                                                                )}
                                                        </div>
                                                        <div className="d-flex flex-wrap gap-2">
                                                                <button className="btn btn-outline-primary" onClick={addQuestion}>
                                                                        <i className="bi bi-plus-circle"></i> Добавить вопрос
                                                                </button>
                                                                <button className="btn linear-gradient-flame" onClick={saveTest}>
                                                                        <i className="bi bi-save"></i> Сохранить тест
                                                                </button>
                                                                <button className="btn btn-secondary bg-opacity-25 text-dark" onClick={resetBuilder}>
                                                                        <i className="bi bi-eraser"></i> Очистить
                                                                </button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div className="col-lg-7">
                                        <div className="card border-0 shadow-sm mb-4" id="verify">
                                                <div className="card-body p-4">
                                                        <div className="d-flex align-items-center gap-2 mb-3">
                                                                <i className="bi bi-check2-square fs-3 text-success"></i>
                                                                <h2 className="h4 mb-0 fw-bold">Проверить знания</h2>
                                                        </div>
                                                        <div className="mb-3">
                                                                <label className="form-label fw-semibold">Выберите тест для прохождения:</label>
                                                                <select
                                                                        className="form-select rounded-pill"
                                                                        value={selectedVerifyTestId}
                                                                        onChange={handleVerifySelect}
                                                                >
                                                                        <option value="">— Выберите —</option>
                                                                        {tests.map(t => (
                                                                                <option key={t.id} value={t.id}>
                                                                                        {t.title}
                                                                                </option>
                                                                        ))}
                                                                </select>
                                                        </div>

                                                        {selectedVerifyTestId && (
                                                                <div id="verifyQuestionsContainer" className="mt-3">
                                                                        {tests.find(t => t.id === selectedVerifyTestId)?.questions.map((q, idx) =>
                                                                                renderVerifyQuestion(q, idx)
                                                                        )}
                                                                </div>
                                                        )}

                                                        {verifyResult && (
                                                                <div id="verifyResultArea" className="mt-3 alert alert-info">
                                                                        <p><strong>Результат:</strong> {verifyResult.correctCount} из 
											{verifyResult.total} правильных</p>
                                                                        {verifyResult.results.map((r, idx) => (
                                                                                <div key={idx} className={r.isCorrect ? 'text-success' : 'text-danger'}>
                                                                                        Вопрос {idx + 1}: {r.isCorrect ? '✓' : '✗'}
                                                                                	{!r.isCorrect && (
    												<span className="small ms-2">
        												(Ваш ответ: {r.userAnsText}, правильный: {r.correctText})
    												</span>
											)}
										</div>
                                                                        ))}
                                                                </div>
                                                        )}

                                                        <button
                                                                className="btn linear-gradient-flame w-100 mt-3"
                                                                onClick={submitVerify}
                                                                disabled={!selectedVerifyTestId}
                                                        >
                                                                <i className="bi bi-check-lg"></i> Отправить & получить оценку
                                                        </button>
                                                </div>
                                        </div>

                                        <div className="card border-0 shadow-sm" id="answers">
                                                <div className="card-body p-4">
                                                        <div className="d-flex align-items-center gap-2 mb-3">
                                                                <i className="bi bi-eye-fill fs-3 text-info"></i>
                                                                <h2 className="h4 mb-0 fw-bold">Показать ответы</h2>
                                                        </div>
                                                        <div className="mb-3">
                                                                <label className="form-label fw-semibold">
                                                                        Выберите тест для отображения ключей:
                                                                </label>
                                                                <select
                                                                        className="form-select rounded-pill"
                                                                        value={selectedAnswerTestId}
                                                                        onChange={handleAnswerSelect}
                                                                >
                                                                        <option value="">— Выберите —</option>
                                                                        {tests.map(t => (
                                                                                <option key={t.id} value={t.id}>
                                                                                        {t.title}
                                                                                </option>
                                                                        ))}
                                                                </select>
                                                        </div>
                                                        <button
                                                                className="btn btn-outline-primary w-100 mb-3"
                                                                onClick={showAnswersHandler}
                                                                disabled={!selectedAnswerTestId}
                                                        >
                                                                <i className="bi bi-journal-bookmark-fill"></i> Показать правильные ответы
                                                        </button>
                                                        <div id="answersDisplayArea" className="bg-light p-3 rounded-4">
                                                                {showAnswers && selectedAnswerTestId
                                                                        ? renderAnswerDisplay(tests.find(t => t.id === selectedAnswerTestId))
                                                                        : <p className="text-muted text-center mb-0">Выберите тест и нажмите кнопку.</p>
                                                                }
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </main>
        );
}

