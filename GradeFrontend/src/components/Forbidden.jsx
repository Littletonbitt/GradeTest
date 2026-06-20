export default function Forbidden() {
        return (
                <>
                        <title>Доступ запрещён — GradeTest</title>
                        <body className="d-flex flex-column min-vh-100">
                                <main className="flex-grow-1 d-flex align-items-center">
                                        <div className="container text-center py-5">
                                                <div className="row justify-content-center">
                                                        <div className="col-lg-8">
                                                                <div className="mb-5">
                                                                        <i className="bi bi-shield-x display-1 flame-gradient-text"></i>
                                                                        <h1 className="display-1 fw-bold mt-4">403</h1>
                                                                        <h2 className="h2 mb-4">Доступ запрещён</h2>
                                                                        <p className="lead text-muted mb-5">
                                                                                У вас нет прав для просмотра этой страницы.
                                                                                Если вы считаете, что это ошибка, свяжитесь с администратором.
                                                                        </p>
                                                                        <div className="feature-card bg-body-secondary p-4 mb-5 rounded-4 shadow-sm">
                                                                                <p className="mb-4 fs-4">Что можно сделать?</p>
                                                                                <div className="row g-3">
                                                                                        <div className="col-md-4">
                                                                                                <a href="/" className="text-decoration-none">
                                                                                                        <div className="p-3 border rounded bg-white hover-shadow">
                                                                                                                <i className="bi bi-house-door fs-4 d-block 
																	mb-2 text-primary">
														</i>
                                                                                                                <small>На главную</small>
                                                                                                        </div>
                                                                                                </a>
                                                                                        </div>
                                                                                        <div className="col-md-4">
                                                                                                <a href="/login" className="text-decoration-none">
                                                                                                        <div className="p-3 border rounded bg-white">
                                                                                                                <i className="bi bi-box-arrow-in-right 
															fs-4 d-block mb-2 text-success">
														</i>
                                                                                                                <small>Войти в аккаунт</small>
                                                                                                        </div>
                                                                                                </a>
                                                                                        </div>
                                                                                        <div className="col-md-4">
                                                                                                <a href="/report" className="text-decoration-none">
                                                                                                        <div className="p-3 border rounded bg-white">
                                                                                                                <i className="bi bi-bug fs-4 d-block 
															mb-2 text-warning">
														</i>
                                                                                                                <small>Сообщить об ошибке</small>
                                                                                                        </div>
                                                                                                </a>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center mb-5">
                                                                                <a href="/" className="btn linear-gradient-flame text-white px-4 py-3 fw-medium">
                                                                                        <i className="bi bi-arrow-left me-2"></i> Вернуться на главную
                                                                                </a>
                                                                                <a href="/contacts" className="btn btn-outline-secondary px-4 py-3">
                                                                                        <i className="bi bi-envelope me-2"></i> Связаться с поддержкой
                                                                                </a>
                                                                        </div>
                                                                        <div className="mt-5 pt-4">
                                                                                <p className="text-muted small">
                                                                                        Ошибка: Доступ запрещён (403)<br />
                                                                                        Если вы уверены, что это недоразумение, 
                                                                                        <a href="/report" className="text-decoration-none"> сообщите нам</a>
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </main>
                        </body>
                </>
        );
}

