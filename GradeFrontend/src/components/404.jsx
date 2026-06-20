export default function NotFoundPage() {
	return (
		<>
			<title>Страница не найдена — GradeTest</title>
			<body class="d-flex flex-column min-vh-100">
				<main class="flex-grow-1 d-flex align-items-center">
    					<div class="container text-center py-5">
        					<div class="row justify-content-center">
            						<div class="col-lg-8">
                						<div class="mb-5">
                    							<i class="bi bi-file-text-x display-1 flame-gradient-text"></i>
                    							<h1 class="display-1 fw-bold mt-4">404</h1>
                    							<h2 class="h2 mb-4">Тест не найден</h2>
                    							<p class="lead text-muted mb-5">
                        							Страница, которую вы ищете, не существует или была перемещена. 
                        							Возможно, вы хотели пройти один из наших тестов?
                    							</p>
                    							<div class="feature-card bg-body-secondary p-4 mb-5 rounded-4 shadow-sm">
                        							<p class="mb-4 fs-4">Пока вы здесь, попробуйте:</p>
                        							<div class="row g-3">
                            								<div class="col-md-4">
                                								<a href="#" class="text-decoration-none">
                                    									<div class="p-3 border rounded bg-white hover-shadow">
                                        									<i class="bi bi-house-door fs-4 
															d-block mb-2 text-primary">
														</i>
                                        									<small>На главную</small>
                                    									</div>
                                								</a>
                            								</div>
                            								<div class="col-md-4">
                                								<a href="#" class="text-decoration-none">
                                    									<div class="p-3 border rounded bg-white">
                                        									<i class="bi bi-box-arrow-in-right fs-4 d-block 
															mb-2 text-success"></i>
                                        									<small>Войти в аккаунт</small>
                                    									</div>
                                								</a>
                            								</div>
                            								<div class="col-md-4">
                                								<a href="#" class="text-decoration-none">
                                    									<div class="p-3 border rounded bg-white">
                                        									<i class="bi bi-credit-card fs-4 d-block 
															mb-2 text-warning"></i>
                                        									<small>Посмотреть тарифы</small>
                                    									</div>
                                								</a>
                            								</div>
                        							</div>
                    							</div>
                    							<div class="d-grid gap-3 d-sm-flex justify-content-sm-center mb-5">
                        							<a href="#" class="btn linear-gradient-flame text-white px-4 py-3 fw-medium">
                            								<i class="bi bi-arrow-left me-2"></i> Вернуться на главную
                        							</a>
                        							<a href="#" class="btn btn-outline-secondary px-4 py-3">
                            								<i class="bi bi-search me-2"></i> Поиск по сайту
                        							</a>
                    							</div>
                    							<div class="mt-5 pt-4">
                        							<p class="text-muted small">
                            								Ошибка: Страница не найдена (404)<br />
                            								Если проблема повторяется, 
                            								<a href="#" class="text-decoration-none">сообщите нам</a>
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

