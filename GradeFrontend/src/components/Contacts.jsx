import { Link } from 'react-router-dom';

export default function Contacts() {
	return (
		<>
    			<title>Контакты — GradeTest</title>
			<main>
    				<div className="container px-4 py-5">
        				<div className="bg-body-secondary py-5 rounded-4 shadow-sm">
            					<div className="row g-5 py-3 px-4 px-lg-5">
                					<div className="col-lg-5">
                    						<div className="contact-card p-4 h-100">
                        						<h2 className="pb-3 border-bottom mb-4 d-flex align-items-center gap-2">
                            							<i className="bi bi-envelope-paper-fill text-primary"></i>
                            							Наши контакты
                        						</h2>
                        						<div className="mb-4">
                            							<p className="mb-3">
                                							<i className="bi bi-telephone-fill text-primary me-3 fs-5"></i>
                                							<span className="fw-semibold">+7 (495) 123-45-67</span>
                            							</p>
                            							<p className="mb-3">
                                							<i className="bi bi-house-door-fill text-primary me-3 fs-5"></i>
                                							<span>г. Москва, ул. Тверская, 15, офис 403</span>
                            							</p>
                            							<p className="mb-3">
                                							<i className="bi bi-envelope-fill text-primary me-3 fs-5"></i>
                                							<Link to="mailto:support@gradetest.ru" 
													className="text-decoration-none">
												support@gradetest.ru
											</Link>
                            							</p>
                            							<p className="mb-3">
                                							<i className="bi bi-clock-fill text-primary me-3 fs-5"></i>
                                							<span>Пн–Пт: 10:00 – 19:00 (МСК)</span>
                            							</p>
                        						</div>
                        						<div className="mt-4">
                            							<h5 className="fw-semibold mb-3">Социальные сети</h5>
                            							<div className="d-flex gap-3">
                                							<a href="#" className="text-muted fs-4">
												<i className="bi bi-telegram"></i>
											</a>
                                							<a href="#" className="text-muted fs-4">
												<i className="bi bi-vk"></i>
											</a>
                                							<a href="#" className="text-muted fs-4">
												<i className="bi bi-youtube"></i>
											</a>
                                							<a href="#" className="text-muted fs-4">
												<i className="bi bi-github"></i>
											</a>
                            							</div>
                        						</div>
                    						</div>
                					</div>
                					<div className="col-lg-7">
                    						<div className="contact-card p-4 h-100">
                        						<h3 className="mb-4 d-flex align-items-center gap-2">
                            							<i className="bi bi-map-fill text-info"></i>
                            							Мы на карте
                        						</h3>
                        						<div className="map-container">
                            							<iframe 
                                							src="https://www.openstreetmap.org/export/embed.html?bbox=37.58711993694306%2C55.733541034712395%2C37.58917450904847%2C55.734395797011835&amp;layer=mapnik" title="Карта офиса GradeTest" allowFullScreen>
										</iframe>
                        						</div>
                        						<div className="mt-3 text-end">
                            							<small>
                                							<a href="https://www.openstreetmap.org/?#map=19/55.733968/37.588147" 
													target="_blank" className="text-decoration-none">
                                    								<i className="bi bi-arrows-angle-expand"></i> 
												Открыть крупную карту
                                							</a>
                            							</small>
                        						</div>
                    						</div>
                					</div>
            					</div>
        				</div>
        				<div className="row mt-5">
            					<div className="col-lg-8 mx-auto">
                					<div className="card border-0 shadow-sm rounded-4 bg-body-secondary">
                    						<div className="card-body p-4 text-center">
                        						<i className="bi bi-chat-dots-fill fs-1 text-primary mb-3"></i>
                        						<h3 className="fw-bold">Остались вопросы?</h3>
                        						<p className="text-muted">Напишите нам, и мы ответим в течение рабочего дня.</p>
                        						<div className="row g-2 justify-content-center mt-3">
                            							<div className="col-sm-6 col-md-4">
                                							<input type="text" className="form-control" placeholder="Ваше имя" />
                            							</div>
                            							<div className="col-sm-6 col-md-4">
                                							<input type="email" className="form-control" placeholder="Email" />
                            							</div>
                            							<div className="col-md-8 mt-2">
                                							<textarea className="form-control" rows="2" placeholder="Сообщение"></textarea>
                            							</div>
                            							<div className="col-12 mt-3">
                                							<button className="btn linear-gradient-flame px-4">Отправить</button>
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
}
