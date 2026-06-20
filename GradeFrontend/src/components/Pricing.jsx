export default function Pricing() {
	return (
		<>
			<div className="container py-3">
    				<main>
        				<div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            					<h1 className="display-4 fw-normal text-body-emphasis">Выберите свой план для работы с тестами</h1>
            					<p className="fs-5 text-body-secondary">
                					Начните бесплатно, переходите на Pro для расширенных возможностей 
                					или выберите Enterprise для командного использования.
            					</p>
        				</div>
        				<div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            					<div className="col">
                					<div className="card mb-4 rounded-3 shadow-sm card-hover">
                    						<div className="card-header py-3">
                        						<h4 className="my-0 fw-normal">Базовый</h4>
                    						</div>
                    						<div className="card-body">
                        						<h1 className="card-title pricing-card-title">
										0 ₽
										<small className="text-body-secondary fw-light">/мес</small>
									</h1>
                        						<ul className="list-unstyled mt-3 mb-4 feature-list">
                            							<li><i className="bi bi-check-circle-fill text-success me-2"></i>
											До 5 активных тестов
										</li>
                            							<li><i className="bi bi-check-circle-fill text-success me-2"></i>
											До 10 вопросов на тест
										</li>
                            							<li><i className="bi bi-check-circle-fill text-success me-2"></i>
											Базовая проверка ответов
										</li>
                            							<li><i className="bi bi-check-circle-fill text-success me-2"></i>
											Показ правильных ответов
										</li>
                            							<li><i className="bi bi-check-circle-fill text-success me-2"></i>
											Статистика за 7 дней
										</li>
                            							<li><i className="bi bi-check-circle-fill text-success me-2"></i>
											Веб-доступ
										</li>
                        						</ul>
                        						<a href="#" className="w-100 btn btn-lg btn-outline-primary">Начать бесплатно</a>
                    						</div>
                					</div>
            					</div>
            					<div className="col">
                					<div className="card mb-4 rounded-3 shadow-sm popular-card card-hover">
                    						<div className="card-header py-3 text-bg-warning border-warning">
                        						<h4 className="my-0 fw-normal">Профессиональный</h4>
                    						</div>
                    						<div className="card-body">
                        						<h1 className="card-title pricing-card-title">
										490 ₽
										<small className="text-body-secondary fw-light">/мес</small>
									</h1>
                        						<ul className="list-unstyled mt-3 mb-4 feature-list">
                            							<li><i className="bi bi-check-circle-fill text-warning me-2"></i>
											<strong>Неограниченное число тестов</strong>
										</li>
                            							<li><i className="bi bi-check-circle-fill text-warning me-2"></i>
											До 100 вопросов на тест
										</li>
                            							<li><i className="bi bi-check-circle-fill text-warning me-2"></i>
											Автоматическая проверка + детальный разбор
										</li>
                            							<li><i className="bi bi-check-circle-fill text-warning me-2"></i>
											Мгновенный показ ответов с пояснениями
										</li>
                            							<li><i className="bi bi-check-circle-fill text-warning me-2"></i>
											Расширенная аналитика (графики, экспорт)
										</li>
                            							<li><i className="bi bi-check-circle-fill text-warning me-2"></i>
											Сохранение результатов учащихся
										</li>
                            							<li><i className="bi bi-check-circle-fill text-warning me-2"></i>
											Кастомные темы оформления
										</li>
                            							<li><i className="bi bi-check-circle-fill text-warning me-2"></i>
											Приоритетная поддержка
										</li>
                        						</ul>
                        						<a href="#" className="w-100 btn btn-lg btn-warning">Купить Pro</a>
                    						</div>
                					</div>
            					</div>
            					<div className="col">
                					<div className="card mb-4 rounded-3 shadow-sm card-hover">
                    						<div className="card-header py-3">
                        						<h4 className="my-0 fw-normal">Командный</h4>
                    						</div>
                    						<div className="card-body">
                        						<h1 className="card-title pricing-card-title">
										1 490 ₽
										<small className="text-body-secondary fw-light">/мес (до 10 чел)</small>
									</h1>
                        						<ul className="list-unstyled mt-3 mb-4 feature-list">
                            							<li><i className="bi bi-check-circle-fill text-primary me-2"></i>
											<strong>Всё из Pro</strong>
										</li>
                            							<li><i className="bi bi-check-circle-fill text-primary me-2"></i>
											Неограниченное число участников
										</li>
                            							<li><i className="bi bi-check-circle-fill text-primary me-2"></i>
											Совместное создание тестов
										</li>
                            							<li><i className="bi bi-check-circle-fill text-primary me-2"></i>
											Роли: автор, редактор, наблюдатель
										</li>
                            							<li><i className="bi bi-check-circle-fill text-primary me-2"></i>
											Групповая статистика и рейтинги
										</li>
                            							<li><i className="bi bi-check-circle-fill text-primary me-2"></i>
											API для интеграции с LMS
										</li>
                            							<li><i className="bi bi-check-circle-fill text-primary me-2"></i>
											Брендирование (White Label)
										</li>
                            							<li><i className="bi bi-check-circle-fill text-primary me-2"></i>
											Выделенная техподдержка 24/7
										</li>
                        						</ul>
                        						<a href="#" className="w-100 btn btn-lg btn-primary">Связаться с отделом продаж</a>
                    						</div>
                					</div>
            					</div>
        				</div>
        				<h2 className="display-6 text-center mb-4">Сравнение возможностей</h2>
        				<div className="table-responsive">
            					<table className="table table-bordered text-center align-middle">
                					<thead className="table-light">
                    						<tr>
                        						<th style={{ width:"34%" }}>Функция</th>
                        						<th style={{ width: "22%" }}>Базовый</th>
                        						<th style={{ width: "22%" }}>Профессиональный</th>
                        						<th style={{ width: "22%" }}>Командный</th>
                    						</tr>
                					</thead>
                					<tbody>
                    						<tr><th scope="row" className="text-start">Количество тестов</th>
									<td>до 5</td><td>∞</td><td>∞</td>
								</tr>
                    						<tr><th scope="row" className="text-start">Вопросов на тест</th>
									<td>до 10</td><td>до 100</td><td>до 500</td>
								</tr>
                    						<tr><th scope="row" className="text-start">Типы вопросов</th>
									<td>одиночный выбор</td>
									<td>одиночный/множественный выбор, текстовый</td>
									<td>все типы + загрузка файлов</td>
								</tr>
                    						<tr><th scope="row" className="text-start">Автопроверка</th>
									<td>✓ (базовая)</td><td>✓ (расширенная)</td><td>✓ (с анализом)</td>
								</tr>
                    						<tr><th scope="row" className="text-start">Показ ответов с пояснениями</th>
									<td>✓</td><td>✓</td><td>✓</td>
								</tr>
                    						<tr><th scope="row" className="text-start">История результатов</th>
									<td>7 дней</td><td>∞</td><td>∞</td>
								</tr>
                    						<tr><th scope="row" className="text-start">Экспорт данных (CSV, PDF)</th>
									<td>—</td><td>✓</td><td>✓</td>
								</tr>
                    						<tr><th scope="row" className="text-start">Групповая работа над тестами</th>
									<td>—</td><td>—</td><td>✓</td>
								</tr>
                    						<tr><th scope="row" className="text-start">API и интеграции</th>
									<td>—</td><td>—</td><td>✓</td>
								</tr>
                    						<tr><th scope="row" className="text-start">Приоритетная поддержка</th>
									<td>—</td><td>✓</td><td>✓ (24/7)</td>
								</tr>
                					</tbody>
            					</table>
        				</div>
    				</main>
			</div>
		</>
	);
}
