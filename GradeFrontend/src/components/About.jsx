import { Link } from 'react-router-dom';

export default function About() {
	return (
		<>	
    			<title>О проекте — GradeTest</title>
			<main>
    				<div className="container py-5">
        				<div className="text-center mb-5">
            					<h1 className="display-4 fw-bold mb-3">
							О проекте <span className="flame-gradient-text">GradeTest</span>
						</h1>
            					<p className="lead text-muted col-lg-8 mx-auto">
                					Простой, быстрый и надёжный инструмент для создания тестов, проверки знаний 
                					и демонстрации правильных ответов. Создан для преподавателей, студентов и всех, 
							кто ценит качественную диагностику знаний.
            					</p>
        				</div>
        				<div className="row g-4 mb-5">
            					<div className="col-md-6">
                					<div className="about-card p-4 h-100 shadow-sm">
                    						<div className="feature-icon mb-3">
                        						<i className="bi bi-bullseye fs-2 text-primary"></i>
                    						</div>
                    						<h3 className="h4 fw-bold">Наша миссия</h3>
                    						<p className="text-muted">
                        						Сделать процесс тестирования доступным, наглядным и эффективным. 
                        						Мы верим, что качественная обратная связь — ключ к обучению, поэтому GradeTest 
                        						помогает не только проверить знания, но и сразу показать правильные ответы с пояснениями.
                    						</p>
                					</div>
            					</div>
            					<div className="col-md-6">
                					<div className="about-card p-4 h-100 shadow-sm">
                    						<div className="feature-icon mb-3">
                        						<i className="bi bi-eye fs-2 text-info"></i>
                    						</div>
                    						<h3 className="h4 fw-bold">Почему GradeTest?</h3>
                    						<p className="text-muted">
                        						Интуитивный конструктор, автоматическая проверка, детальная статистика 
                        						и мгновенный показ ответов. Экономьте время и получайте полную картину успеваемости.
                    						</p>
                					</div>
            					</div>
        				</div>
        				<div className="modal modal-sheet position-static d-block p-4 py-md-5" tabindex="-1" role="dialog">
            					<div className="modal-dialog modal-lg">
                					<div className="modal-content rounded-4 shadow bg-body-secondary border-0">
                    						<div className="modal-body p-5">
                        						<h2 className="fw-bold mb-4">Ключевые возможности GradeTest</h2>
                        						<ul className="d-grid gap-4 my-4 list-unstyled">
                            							<li className="d-flex gap-4 align-items-start">
                                							<i className="bi bi-pencil-square text-primary fs-2"></i>
                                							<div>
                                    								<p className="mb-1 fs-5 fw-semibold">Создание тестов за минуты</p>
                                    								<p className="text-muted mb-0">
													Интуитивный конструктор с любым количеством вопросов 
													и вариантов ответов. Сохраняйте, редактируйте, дублируйте.
												</p>
                                							</div>
                            							</li>
                            							<li className="d-flex gap-4 align-items-start">
                                							<i className="bi bi-check-circle-fill text-success fs-2"></i>
                                							<div>
                                    								<p className="mb-1 fs-5 fw-semibold">Автоматическая проверка</p>
                                    								<p className="text-muted mb-0">
													Мгновенный подсчёт баллов и детальный разбор ошибок. 
													Учащиеся видят свой результат сразу.
												</p>
                                							</div>
                            							</li>
                            							<li className="d-flex gap-4 align-items-start">
                                							<i className="bi bi-eye-fill text-info fs-2"></i>
                                							<div>
                                    								<p className="mb-1 fs-5 fw-semibold">Показ правильных ответов</p>
                                    								<p className="text-muted mb-0">
													После завершения теста можно продемонстрировать ключи с
													пояснениями — идеально для обучения.
												</p>
                                							</div>
                            							</li>
                            							<li className="d-flex gap-4 align-items-start">
                                							<i className="bi bi-graph-up text-warning fs-2"></i>
                                							<div>
                                    								<p className="mb-1 fs-5 fw-semibold">Аналитика и статистика</p>
                                    								<p className="text-muted mb-0">
													Отслеживайте прогресс, экспортируйте результаты, стройте 
													диаграммы успеваемости.
												</p>
                                							</div>
                            							</li>
                        						</ul>
                        						<Link to="/login" className="btn linear-gradient-flame w-100 mt-3 py-2">
                            							Попробовать бесплатно 
										<i className="bi bi-arrow-right ms-2"></i>
                        						</Link>
                    						</div>
                					</div>
            					</div>
        				</div>
        				<div className="row mt-5 pt-3 g-4">
            					<div className="col-md-4">
                					<div className="text-center">
                    						<i className="bi bi-people-fill fs-1 text-primary mb-3"></i>
                    						<h4 className="fw-semibold">Основан в 2024</h4>
                    						<p className="text-muted">GradeTest создан командой разработчиков и педагогов, объединивших лучшие 
									практики тестирования.
								</p>
                					</div>
            					</div>
            					<div className="col-md-4">
                					<div className="text-center">
                    						<i className="bi bi-shield-check fs-1 text-success mb-3"></i>
                    						<h4 className="fw-semibold">Безопасность данных</h4>
                    						<p className="text-muted">
									Все результаты тестов надёжно зашифрованы, доступ 
									только у автора и участников.
								</p>
                					</div>
            					</div>
            					<div className="col-md-4">
                					<div className="text-center">
                    						<i className="bi bi-globe2 fs-1 text-info mb-3"></i>
                    						<h4 className="fw-semibold">Доступность 24/7</h4>
                    						<p className="text-muted">
									Работайте с тестами в любое время — из браузера, с мобильного или планшета.
								</p>
                					</div>
            					</div>
        				</div>
    				</div>
			</main>
		</>
	);
}
