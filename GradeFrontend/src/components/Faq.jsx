import { Link } from 'react-router-dom';

export default function Faq() {
	return (
		<>
			<div className="row mt-5 pt-5">
            			<div className="col-lg-8 mx-auto">
                			<h2 className="text-center mb-4">Часто задаваемые вопросы</h2>
                			<div className="accordion" id="faqAccordion">
                   				<div className="accordion-item">
                       					<p className="accordion-header" style={{ fontSize: "24px" }}>
                           					<button className="accordion-button" type="button" 
										data-bs-toggle="collapse" data-bs-target="#faq1">
                             						Могу ли я изменить тариф в любой момент?
                            					</button>
                        				</p>
                        				<div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                            					<div className="accordion-body">
                               						Да, вы можете перейти на более высокий тариф или 
									отключить подписку в любой момент. 
                              						При переходе на Pro вы получаете все новые возможности мгновенно.
                            					</div>
                        				</div>
                    				</div>
                    				<div className="accordion-item">
                        				<p className="accordion-header" style={{ fontSize: "24px" }}>
                            					<button className="accordion-button collapsed" type="button" 
										data-bs-toggle="collapse" data-bs-target="#faq2">
                                					Есть ли пробный период Professional?
                            					</button>
                        				</p>
                        				<div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            					<div className="accordion-body">
                                					Да, мы предлагаем 14-дневный пробный период для тарифа Professional. 
                                					Никакая карта не требуется, все функции Pro доступны в течение двух недель.
                            					</div>
                        				</div>
                    				</div>
                    				<div className="accordion-item">
                        				<p className="accordion-header" style={{ fontSize: "24px" }}>
                            					<button className="accordion-button collapsed" type="button" 
										data-bs-toggle="collapse" data-bs-target="#faq3">
                                					Можно ли использовать GradeTest для обучения в школе или вузе?
                            					</button>
                        				</p>
                        				<div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            					<div className="accordion-body">
                               						Абсолютно. GradeTest подходит как для индивидуальных 
									преподавателей, так и для целых учебных заведений. 
                                					Для образовательных организаций действуют специальные 
									цены — свяжитесь с нами.
                            					</div>
                        				</div>
                    				</div>
						<div className="accordion-item">
                                                        <p className="accordion-header">
                                                                <button
                                                                        className="accordion-button collapsed"
                                                                        type="button"
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target="#faq4"
                                                                >
                                                                        <span className="cool-icon"></span>
                                                                        Нашли ошибку? Не знаете как отправить отчёт об ошибке?
                                                                </button>
                                                        </p>
                                                        <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                                                <div className="accordion-body">
                                                                        <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                                                <span>Нажмите</span>
                                                                                <Link to="/report" className="cool-link">
                                                                                        сюда
                                                                                </Link>
                                                                                <span>и заполните форму — мы исправим ошибку в кратчайший срок!</span>
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </div>
					</div>
            			</div>
        		</div>
		</>
	);

}
