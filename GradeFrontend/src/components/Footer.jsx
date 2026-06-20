import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<>
			<div className="footer bg-body-secondary">
    				<hr className="border-secondary" />
    				<div className="container bg-body-secondary">
        				<div className="row">
            					<div className="col-lg-4 mb-4">
                					<a className="navbar-brand d-flex align-items-center mb-3" href="#">
                    						<i className="bi bi-file-text-fill fs-4 me-2 text-primary"></i>
                    						<span className="h4 mb-0 flame-gradient-text">GradeTest</span>
                					</a>
                					<p className="text-muted">Создавайте, проверяйте, показывайте ответы. 
								Умный инструмент для тестирования знаний.
							</p>
            					</div>
            					<div className="col-lg-2 col-md-4 mb-4">
                					<h5>Продукт</h5>
                					<ul className="list-unstyled">
                    						<li className="mb-1"><a href="#" className="text-decoration-none text-muted">Возможности</a></li>
                    						<li className="mb-1"><a href="#" className="text-decoration-none text-muted">Тарифы</a></li>
                    						<li className="mb-1"><a href="#" className="text-decoration-none text-muted">API</a></li>
                					</ul>
            					</div>
            					<div className="col-lg-2 col-md-4 mb-4">
                					<h5>Компания</h5>
                					<ul className="list-unstyled">
                    						<li className="mb-1"><a href="#" className="text-decoration-none text-muted">О проекте</a></li>
                    						<li className="mb-1"><a href="#" className="text-decoration-none text-muted">Блог</a></li>
                    						<li className="mb-1">
									<Link to="/contacts" className="text-decoration-none text-muted">Контакты</Link>
								</li>
                					</ul>
            					</div>
            					<div className="col-lg-4 col-md-4 mb-4">
                					<h5>Подпишитесь на новости</h5>
                					<div className="input-group mb-3">
                    						<input type="email" className="form-control bg-light" placeholder="Ваш email" />
                    						<button className="btn linear-gradient-flame" type="button">Подписаться</button>
                					</div>
                					<div className="d-flex gap-3">
                    						<a href="#" className="text-muted"><i className="bi bi-telegram fs-5"></i></a>
                    						<a href="#" className="text-muted"><i className="bi bi-vk fs-5"></i></a>
                    						<a href="#" className="text-muted"><i className="bi bi-youtube fs-5"></i></a>
                    						<a href="#" className="text-muted"><i className="bi bi-github fs-5"></i></a>
                					</div>
            					</div>
        				</div>
        				<hr className="border-secondary my-4" />
        				<div className="row pb-3">
            					<div className="col-md-6 text-muted small">© 2026 GradeTest. Все права защищены.
						</div>
            					<div className="col-md-6 text-end text-muted small">
                					<a href="#" className="text-decoration-none text-muted me-3">
								Политика конфиденциальности
							</a>
                					<a href="#" className="text-decoration-none text-muted">
								Условия использования
							</a>
            					</div>
        				</div>
    				</div>
			</div>
		</>
	);
}
