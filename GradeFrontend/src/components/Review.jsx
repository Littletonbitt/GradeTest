import React, { useState } from 'react';
import './css/Review.css'


const GradeTestReviews = () => {
        const reviewsData = [
                {
                        id: 1,
                        name: 'Анна Смирнова',
                        rating: 5,
                        title: 'Преподаватель английского, 6 месяцев с GradeTest',
                        headline: '«Экономит часы на проверку тестов»',
                        text: `Раньше я вручную проверяла домашние задания по 3 часа каждый вечер. С GradeTest создаю тесты 
				за 10 минут, ученики проходят их онлайн, а система автоматически проверяет и показывает 
				правильные ответы с пояснениями. За полгода мой класс улучшил успеваемость на 40% — ученики 
				видят свои ошибки сразу и могут пересдать тему. Показ ответов после теста — лучшая функция для обучения!`,
                        badges: ['Грамматические тесты', 'Словарные диктанты', 'Аудирование'],
                        progress: 100,
                        metricValue: '85 учеников',
                        metricLabel: 'успешно сдали экзамены',
                        category: 'Образование'
                },
                {
                        id: 2,
                        name: 'Дмитрий Орлов',
                        rating: 5,
                        title: 'IT-директор, 4 месяца с GradeTest',
                        headline: '«Внедрили тестирование для 200 сотрудников за неделю»',
                        text: `Нам нужно было быстро оценить уровень технических знаний персонала перед стартом проектов. 
				GradeTest позволил создать базу из 150 вопросов с разными типами ответов и автоматической 
				проверкой. Сотрудники проходят тесты удалённо, видят свой результат и ошибки. Командный тариф 
				дал нам роли, экспорт статистики и API для интеграции с нашей HRM-системой. Время на оценку сократилось в 10 раз!`,
                        badges: ['Технические тесты', 'Оценка навыков', 'Корпоративное обучение'],
                        progress: 95,
                        metricValue: '200+',
                        metricLabel: 'протестированных сотрудников',
                        category: 'Корпоративное обучение'
                },
                {
                        id: 3,
                        name: 'Екатерина Лебедева',
                        rating: 4.5,
                        title: 'Студентка, 8 месяцев с GradeTest',
                        headline: '«Подготовилась к ЕГЭ на 96 баллов»',
                        text: `Я готовилась к экзамену сама, без репетитора. Создавала тесты по темам, где делала ошибки, 
				и повторяла их по несколько раз. Функция «показать правильные ответы» помогала учиться на ошибках. 
				Через месяц я сократила количество ошибок в 2 раза. Итог — 96 баллов на ЕГЭ по русскому. GradeTest 
				стал моим личным тренажёром для отработки сложных тем.`,
                        badges: ['Подготовка к ЕГЭ', 'Математика', 'Русский язык'],
                        progress: 100,
                        metricValue: '96 баллов',
                        metricLabel: 'итоговый результат',
                        category: 'Самостоятельная подготовка'
                },
                {
                        id: 4,
                        name: 'Олег Ковальчук',
                        rating: 4,
                        title: 'Владелец онлайн-школы, 1 год с GradeTest',
                        headline: '«Рост продаж курсов на 35%»',
                        text: `Мы используем GradeTest для входного тестирования и итоговой аттестации учеников. Автоматическая 
				проверка и детальная аналитика помогают видеть слабые места каждого студента. Также мы добавили 
				платные тесты-тренажёры — ученики покупают доступ, чтобы отработать темы. За год 
				количество прошедших полный курс выросло на 35%, а рейтинг школы поднялся до 4,9.`,
                        badges: ['Входное тестирование', 'Итоговые экзамены', 'Аналитика успеваемости'],
                        progress: 88,
                        metricValue: '35% рост',
                        metricLabel: 'завершивших курс',
                        category: 'Онлайн-курсы'
                }
        ];
        const [selectedFilter, setSelectedFilter] = useState('Все отзывы');
        const [formData, setFormData] = useState({
                name: '',
                email: '',
                rating: 0,
                useCase: '',
                review: '',
                consent1: false,
                consent2: false,
        });

        const filteredReviews = selectedFilter === 'Все отзывы'
                ? reviewsData
                : reviewsData.filter(review => review.category === selectedFilter);

        const handleInputChange = (e) => {
                const { id, value, type, checked } = e.target;
                setFormData(prev => ({
                        ...prev,
                        [id]: type === 'checkbox' ? checked : value
                }));
        };

        const handleRatingClick = (ratingValue) => {
                setFormData(prev => ({ ...prev, rating: ratingValue }));
        };

        const isSubmitEnabled = formData.consent1 && formData.consent2 && (formData.name.trim()!=='') && 
		(formData.email.trim() !== '') && (formData.rating!==0);

        const handleSubmit = (e) => {
                e.preventDefault();
                alert('Спасибо за ваш отзыв! Он будет опубликован после модерации.');
                setFormData({
                        name: '',
                        email: '',
                        rating: 0,
                        useCase: '',
                        review: '',
                        consent1: false,
                        consent2: false,
                });
        };

        const renderStars = (rating, interactive = false, onClickHandler = null) => {
                const fullStars = Math.floor(rating);
                const hasHalf = rating % 1 !== 0;
                const starsArray = [];
                for (let i = 1; i <= 5; i++) {
                        if (i <= fullStars) {
                                starsArray.push(
					<i key={i} className="bi bi-star-fill" data-rating={i} 
						onClick={interactive ? () => onClickHandler(i) : undefined} 
						style={{ cursor: interactive ? 'pointer' : 'default' }}>
					</i>
				);
                        } else if (i === fullStars + 1 && hasHalf) {
                                starsArray.push(
					<i key={i} className="bi bi-star-half" data-rating={i} 
						onClick={interactive ? () => onClickHandler(i) : undefined} 
						style={{ cursor: interactive ? 'pointer' : 'default' }}>
					</i>
				);
                        } else {
                                starsArray.push(
					<i key={i} className="bi bi-star" data-rating={i} 
						onClick={interactive ? () => onClickHandler(i) : undefined} 
						style={{ cursor: interactive ? 'pointer' : 'default' }}>
					</i>
				);
                        }
                }
                return starsArray;
        };

        return (
                <>
                        <main>
                                <div className="container py-5">
                                        <div className="row mb-5">
                                                <div className="col-lg-10 mx-auto text-center">
                                                        <h1 className="display-4 fw-bold mb-3">Истории успеха преподавателей и студентов</h1>
                                                        <p className="lead text-muted mb-4">
                                                                Узнайте, как GradeTest помогает создавать качественные тесты, 
								проверять знания и показывать правильные ответы.
                                                        </p>
                                                        <div className="d-flex justify-content-center align-items-center">
                                                                <div className="mx-4 text-center">
                                                                        <h2 className="fw-bold display-6">4.9</h2>
                                                                        <div className="rating-stars">
                                                                                {renderStars(5, false)}
                                                                        </div>
                                                                        <p className="small text-muted">Средняя оценка</p>
                                                                </div>
                                                                <div className="mx-4 text-center">
                                                                        <h2 className="fw-bold display-6">3,200+</h2>
                                                                        <p className="small text-muted">Активных пользователей</p>
                                                                </div>
                                                                <div className="mx-4 text-center">
                                                                        <h2 className="fw-bold display-6">12,500+</h2>
                                                                        <p className="small text-muted">Созданных тестов</p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="row mb-5">
                                                <div className="col-lg-8 mx-auto">
                                                        <div className="bg-body-secondary rounded-4 p-4">
                                                                <h3 className="h5 mb-3">Фильтр по типу использования:</h3>
                                                                <div className="d-flex flex-wrap gap-2">
                                                                        {['Все отзывы', 'Образование', 'Корпоративное обучение', 
										'Самостоятельная подготовка', 'Онлайн-курсы'].map(filter => (
                                                                                <button
                                                                                        key={filter}
                                                                                        className={`btn btn-outline-primary 
												${selectedFilter === filter ? 'active' : ''}`}
                                                                                        onClick={() => setSelectedFilter(filter)}
                                                                                >
                                                                                        {filter}
                                                                                </button>
                                                                        ))}
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="row g-4 mb-5">
                                                {filteredReviews.map(review => (
                                                        <div className="col-lg-6" key={review.id}>
                                                                <div className="review-card bg-body-secondary p-4 h-100">
                                                                        <div className="d-flex align-items-center mb-3">
                                                                                <div className="user-avatar me-3">
                                                                                        <i className="bi bi-person-circle photos-review"></i>
                                                                                </div>
                                                                                <div>
                                                                                        <h4 className="mb-1 h5">{review.name}</h4>
                                                                                        <div className="rating-stars mb-1">
                                                                                                {renderStars(review.rating, false)}
                                                                                        </div>
                                                                                        <p className="text-muted small mb-0">{review.title}</p>
                                                                                </div>
                                                                        </div>
                                                                        <h5 className="h6 mb-2">{review.headline}</h5>
                                                                        <p className="mb-3">{review.text}</p>
                                                                        <div className="mb-3">
                                                                                {review.badges.map((badge, idx) => (
                                                                                        <span className="habit-badge" key={idx}>{badge}</span>
                                                                                ))}
                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                                <div
                                                                                        className="progress-circle-review"
                                                                                        style={{ background: `conic-gradient(#2c7da0 
												${review.progress}%, #e2e8f0 0)` }}
                                                                                >
                                                                                        {review.progress}%
                                                                                </div>
                                                                                <div className="text-end">
                                                                                        <p className="mb-0"><strong>{review.metricValue}</strong></p>
                                                                                        <p className="text-muted small mb-0">{review.metricLabel}</p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                        <div className="row mb-5">
                                                <div className="col-lg-10 mx-auto">
                                                        <div className="bg-body-secondary rounded-top-4 p-4 text-center">
                                                                <h2 className="mb-3 h3">Почему преподаватели и студенты выбирают GradeTest</h2>
                                                                <p className="lead mb-0">Инструменты, которые реально экономят время и повышают качество знаний</p>
                                                        </div>
                                                        <div className="bg-body-secondary p-4 rounded-bottom-4">
                                                                <div className="row g-4">
                                                                        <div className="col-md-4 text-center">
                                                                                <div className="p-3">
                                                                                        <i className="bi bi-pencil-square display-6 flame-gradient-text mb-3"></i>
                                                                                        <h4 className="h5">Создание за минуты</h4>
                                                                                        <p className="text-muted">Интуитивный конструктор с любым 
												количеством вопросов и вариантов
											</p>
                                                                                </div>
                                                                        </div>
                                                                        <div className="col-md-4 text-center">
                                                                                <div className="p-3">
                                                                                        <i className="bi bi-check-circle-fill display-6 flame-gradient-text mb-3"></i>
                                                                                        <h4 className="h5">Автоматическая проверка</h4>
                                                                                        <p className="text-muted">Мгновенный расчёт баллов и детальный разбор ошибок</p>
                                                                                </div>
                                                                        </div>
                                                                        <div className="col-md-4 text-center">
                                                                                <div className="p-3">
                                                                                        <i className="bi bi-eye-fill display-6 flame-gradient-text mb-3"></i>
                                                                                        <h4 className="h5">Показ правильных ответов</h4>
                                                                                        <p className="text-muted">Студенты учатся на своих ошибках, 
												а вы экономите время на объяснениях
											</p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="row">
                                                <div className="col-lg-8 mx-auto">
                                                        <div className="bg-body-secondary rounded-4 p-4">
                                                                <h3 className="text-center mb-4">Поделитесь своей историей использования GradeTest</h3>
                                                                <form id="share-form" onSubmit={handleSubmit}>
                                                                        <div className="row g-3">
                                                                                <div className="col-md-6">
                                                                                        <label htmlFor="name" className="form-label required-field">Ваше имя</label>
                                                                                        <input type="text" className="form-control" id="name" 
												placeholder="Как к вам обращаться?" 
												value={formData.name} onChange={handleInputChange} />
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                        <label htmlFor="email" className="form-label required-field">Email</label>
                                                                                        <input type="email" className="form-control" id="email" 
												placeholder="Для связи с вами" 
												value={formData.email} onChange={handleInputChange} />
                                                                                </div>
                                                                                <div className="col-12">
                                                                                        <span className="form-label required-field">Ваша оценка GradeTest</span>
                                                                                        <div className="rating-stars fs-3 mb-3" id="rating-stars-select">
                                                                                                {renderStars(formData.rating, true, handleRatingClick)}
                                                                                        </div>
                                                                                </div>
                                                                                <div className="col-12">
                                                                                        <label htmlFor="useCase" className="form-label">
												Как вы используете GradeTest?
											</label>
                                                                                        <input type="text" className="form-control" id="useCase" 
												placeholder={text1} value={formData.useCase} 
												onChange={handleInputChange} />
                                                                                </div>
                                                                                <div className="col-12">
                                                                                        <label htmlFor="review" className="form-label">Ваш отзыв</label>
                                                                                        <textarea className="form-control" id="review" rows="5" 
												placeholder={text2} value={formData.review} 
												onChange={handleInputChange}></textarea>
                                                                                </div>
                                                                                <div className="col-12">
                                                                                        <div className="form-check">
                                                                                                <input className="form-check-input" type="checkbox" 
													id="consent1" checked={formData.consent1} 
													onChange={handleInputChange} />
                                                                                                <label className="form-check-label required-field" htmlFor="consent1">
                                                                                                        Я согласен на публикацию этого отзыва на сайте
                                                                                                </label>
                                                                                        </div>
                                                                                        <div className="form-check">
                                                                                                <input className="form-check-input" type="checkbox" 
													id="consent2" checked={formData.consent2} 
													onChange={handleInputChange} />
                                                                                                <label className="form-check-label required-field" htmlFor="consent2">
                                                                                                        Я подтверждаю согласие на обработку персональных данных
                                                                                                </label>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="col-12 text-center">
                                                                                        <button type="submit" 
													className="btn linear-gradient-flame text-white px-5 py-3" 
													disabled={!isSubmitEnabled}>
                                                                                                Отправить отзыв
                                                                                        </button>
                                                                                </div>
                                                                        </div>
                                                                </form>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </main>
                </>
        );
};

export default GradeTestReviews;

const text1 = "Например: для уроков, самоподготовки, корпоративного тестирования...";
const text2 = "Расскажите, как GradeTest помог вам в обучении или преподавании...";

