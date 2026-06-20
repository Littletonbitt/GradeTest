import { Link } from 'react-router-dom';
import './css/Report.css';


export default function BugReport() {
        return (
                <>
                        <main>
                                <div className="container py-5">
                                        <div className="row mb-5">
                                                <div className="col-lg-10 mx-auto">
                                                        <div className="bug-container text-center mb-4">
                                                                <h1 className="display-5 fw-bold mb-3">
                                                                        <i className="bi bi-bug-fill me-2" style={{ color: "#2c7da0" }}></i>
                                                                        Сообщить об ошибке в GradeTest
                                                                </h1>
                                                                <p className="lead mb-0">
                                                                        Помогите нам улучшить GradeTest. Опишите проблему как можно подробнее —
                                                                        мы проверим и исправим в кратчайшие сроки.
                                                                </p>
                                                        </div>
                                                        <div className="row g-4" id="report-form-form">
                                                                <div className="col-lg-8">
                                                                        <div className="bg-body-secondary form-card p-4 h-100">
                                                                                <h3 className="mb-3 fs-2">Форма отчёта</h3>
                                                                                <form id="report-bug-form">
                                                                                        <div className="row g-3">
                                                                                                <div className="col-lg-12">
                                                                                                        <label htmlFor="bug-title" 
														className="form-label required-field">
														Заголовок ошибки
													</label>
                                                                                                        <input type="text" name="bug-text" id="bug-title" 
														className="form-control"
                                                                                                                placeholder="Краткое описание проблемы" 
													required />
                                                                                                        <div className="form-text">
														Например: "Невозможно сохранить 
															тест с 20 вопросами"
													</div>
                                                                                                </div>
                                                                                                <div className="col-md-6">
                                                                                                        <label htmlFor="bug-type" className="form-label 
														required-field">Тип ошибки
													</label>
                                                                                                        <select className="form-select" name="bug-type" 
														id="bug-type" required>
                                                                                                                <option value="" selected disabled>
															Выберите тип
														</option>
                                                                                                                <option value="crash">
															Приложение вылетает / страница не загружается
														</option>
                                                                                                                <option value="ui">
															Проблема с интерфейсом (вёрстка, кнопки)
														</option>
                                                                                                                <option value="functionality">
															Не работает функционал (создание теста, 
															проверка)
														</option>
                                                                                                                <option value="performance">
															Тормозит при работе с тестами
														</option>
                                                                                                                <option value="security">
															Проблема с доступом или данными
														</option>
                                                                                                                <option value="another">
															Другое
														</option>
                                                                                                        </select>
                                                                                                </div>
                                                                                                <div className="col-md-6">
                                                                                                        <label htmlFor="bug-priority" 
														className="form-label required-field">Приоритет
													</label>
                                                                                                        <select className="form-select" name="bug-priority" 
															id="bug-priority" required>
                                                                                                                <option value="" selected disabled>
															Выберите приоритет
														</option>
                                                                                                                <option value="high">
															Высокий (блокирует работу — 
															тесты не создаются)
														</option>
                                                                                                                <option value="medium">
															Средний (мешает, но можно работать)
														</option>
                                                                                                                <option value="low">
															Низкий (незначительная проблема, опечатка)
														</option>
                                                                                                        </select>
                                                                                                </div>
                                                                                                <div className="col-lg-12">
                                                                                                        <label htmlFor="bug-describe-text" 
														className="form-label required-field">
														Подробное описание
													</label>
                                                                                                        <textarea className="form-control" id="bug-describe-text" 
														rows="5"
                                                                                                                placeholder={PlaceholderText1} required></textarea>
                                                                                                </div>
                                                                                                <div className="col-lg-12">
                                                                                                        <label htmlFor="steps-to-repeat" 
														className="form-label required-field">
														Шаги для воспроизведения
													</label>
                                                                                                        <textarea id="steps-to-repeat" rows="4" className="form-control"
                                                                                                                placeholder={PlaceholderText2} required></textarea>
                                                                                                </div>
                                                                                                <div className="col-md-6">
                                                                                                        <label htmlFor="expect-result" 
														className="form-label required-field">
														Ожидаемый результат
													</label>
                                                                                                        <textarea className="form-control" id="expect-result" rows="3"
                                                                                                                placeholder={PlaceholderText3}
                                                                                                                required></textarea>
                                                                                                </div>
                                                                                                <div className="col-md-6">
                                                                                                        <label htmlFor="fact-result" 
														className="form-label required-field">
														Фактический результат
													</label>
                                                                                                        <textarea id="fact-result" className="form-control" rows="3"
                                                                                                                placeholder={PlaceholderText4}
                                                                                                                required></textarea>
                                                                                                </div>
                                                                                                <div className="col-lg-12">
                                                                                                        <label className="form-label">Скриншоты (если есть)</label>
                                                                                                        <div className="screenshot-preview mb-3" 
															id="screenshotpreview">
                                                                                                                <div className="text-center">
                                                                                                                        <i className="bi bi-camera 
																display-4 text-muted mb-2 d-block">
															</i>
                                                                                                                        <p className="text-muted mb-0">
																Нажмите для загрузки скриншота
															</p>
                                                                                                                        <small className="text-muted">
																Максимальный размер: 5MB
															</small>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                        <input type="file" className="form-control d-none" 
														id="screenshot-input" accept="image/*" />
                                                                                                        <div id="screenshotContainer" className="mt-3"></div>
                                                                                                </div>
                                                                                                <div className="col-12">
                                                                                                        <h4 className="fs-5 mb-2">
														Контактная информация (опционально)
													</h4>
                                                                                                        <div className="row g-3">
                                                                                                                <div className="col-md-6">
                                                                                                                        <label htmlFor="userEmail" 
																className="form-label">
																Email для обратной связи
															</label>
                                                                                                                        <input type="email" className="form-control" 
																id="userEmail" 
																placeholder="ivan@example.com" />
                                                                                                                </div>
                                                                                                                <div className="col-md-6">
                                                                                                                        <label htmlFor="userName" 
																className="form-label">
																Ваше имя
															</label>
                                                                                                                        <input type="text" className="form-control" 
																id="userName" 
																placeholder="Иван Петров" />
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className="col-12">
                                                                                                        <h4 className="fs-5 mb-2">Информация об устройстве</h4>
                                                                                                        <div className="row g-3">
                                                                                                                <div className="col-md-6">
                                                                                                                        <label htmlFor="deviceType" 
																className="form-label">
																Тип устройства
															</label>
                                                                                                                        <select className="form-select" 
																	id="deviceType">
                                                                                                                                <option value="" selected>
																	Не указывать
																</option>
                                                                                                                                <option value="windows">
																	Windows
																</option>
                                                                                                                                <option value="mac">
																	Mac OS
																</option>
                                                                                                                                <option value="linux">
																	Linux
																</option>
                                                                                                                                <option value="web">
																	Веб-браузер (Chrome, 
																	Firefox...)
																</option>
                                                                                                                        </select>
                                                                                                                </div>
                                                                                                                <div className="col-md-6">
                                                                                                                        <label htmlFor="appVersion" 
																className="form-label">
																Версия приложения / браузера
															</label>
                                                                                                                        <input type="text" 
																className="form-control" 
																id="appVersion" 
																placeholder="Chrome 120,GradeTest v2" />
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className="col-12">
                                                                                                        <div className="form-check mb-3">
                                                                                                                <input className="form-check-input" type="checkbox" 
															id="consentCheck" required />
                                                                                                                <label className="form-check-label" 
																htmlFor="consentCheck">
                                                                                                                        Я согласен на обработку моих 
															персональных данных для решения проблемы
                                                                                                                </label>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className="col-12">
                                                                                                        <div className="d-flex justify-content-between">
                                                                                                                <button type="reset" className="btn 
															btn-outline-secondary px-4">
                                                                                                                        <i className="bi bi-arrow-clockwise me-2"></i>
															Очистить форму
                                                                                                                </button>
                                                                                                                <button type="submit" className="btn 
																linear-gradient-flame 
																text-white px-4">
                                                                                                                        <i className="bi bi-send me-2"></i>
																Отправить отчёт
                                                                                                                </button>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </form>
                                                                        </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                        <div>
                                                                                <div className="form-card bg-body-secondary p-4 mb-4">
                                                                                        <h3 className="fs-3 mb-3"><i className="bi bi-info-circle me-2 
													flame-gradient-text"></i> 
												Как правильно сообщить об ошибке
											</h3>
                                                                                        <div className="step-item">
                                                                                                <p className="fs-5 fw-semibold">Опишите проблему</p>
                                                                                                <p className="text-muted small">
													Чётко сформулируйте, что пошло не так. Укажите, 
													что вы делали и что ожидали получить.
												</p>
                                                                                        </div>
                                                                                        <div className="step-item">
                                                                                                <p className="fs-5 fw-semibold">Воспроизведите шаги</p>
                                                                                                <p className="text-muted small">Подробно опишите 
													последовательность действий, которая приводит к ошибке 
													(создание теста, проверка, ответы).
												</p>
                                                                                        </div>
                                                                                        <div className="step-item">
                                                                                                <p className="fs-5 fw-semibold">Добавьте скриншоты</p>
                                                                                                <p className="text-muted small">
													Визуальное подтверждение помогает быстрее понять проблему 
													с интерфейсом или результатами.
												</p>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="form-card bg-body-secondary p-4 mb-4">
                                                                                        <h3 className="fs-3 mb-3">
												<i className="bi bi-tags me-2 flame-gradient-text"></i> 
												Типы ошибок
											</h3>
                                                                                        <div className="priority-high p-3 rounded mb-3">
                                                                                                <p className="fw-semibold mb-1">Критические</p>
                                                                                                <p className="small text-muted mb-0">
													Невозможно создать тест, не работает 
													проверка, потеря данных.
												</p>
                                                                                        </div>
                                                                                        <div className="priority-medium p-3 rounded mb-3">
                                                                                                <p className="fw-semibold mb-1">Функциональные</p>
                                                                                                <p className="small text-muted mb-0">
													Кнопки не реагируют, неправильно считается результат, 
													ответы не отображаются.
												</p>
                                                                                        </div>
                                                                                        <div className="priority-low p-3 rounded">
                                                                                                <p className="fw-semibold mb-1">Визуальные/текстовые</p>
                                                                                                <p className="small text-muted mb-0">
													Опечатки, наложение элементов, мелкие баги интерфейса.
												</p>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="form-card bg-body-secondary p-4">
                                                                                        <h3 className="fs-3 mb-3">
												<i className="bi bi-bar-chart me-2 flame-gradient-text"></i> 
												Статистика отчётов
											</h3>
                                                                                        <div className="d-flex justify-content-between mb-2">
                                                                                                <span className="text-muted">Всего отчётов</span>
                                                                                                <span className="fw-bold">1,532</span>
                                                                                        </div>
                                                                                        <div className="d-flex justify-content-between mb-2">
                                                                                                <span className="text-muted">Исправлено</span>
                                                                                                <span className="fw-bold">1,205</span>
                                                                                        </div>
                                                                                        <div className="d-flex justify-content-between mb-2">
                                                                                                <span className="text-muted">В работе</span>
                                                                                                <span className="fw-bold">198</span>
                                                                                        </div>
                                                                                        <div className="d-flex justify-content-between">
                                                                                                <span className="text-muted">Среднее время ответа</span>
                                                                                                <span className="fw-bold">24 часа</span>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </main>
                </>
        );
};

const PlaceholderText1 = "Что именно пошло не так? Например: 'При попытке добавить 11-й вопрос в тест, кнопка «Сохранить» не реагирует.'";

const PlaceholderText2 = `1. Зайти в раздел «Создать тест»
2. Ввести название теста
3. Добавить 10 вопросов
4. Нажать кнопку «Сохранить»
5. ...`;

const PlaceholderText3 = "Например: Тест должен сохраниться, появится сообщение об успехе.";
const PlaceholderText4 = "Например: Ничего не происходит, в консоли ошибка.";
