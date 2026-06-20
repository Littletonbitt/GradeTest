let tests = [];
let nextId = 1;

let builderQuestions = [];
let currentVerifyId = null;
let currentAnswerId = null;

function initDemo() {
	tests = [
			{
                		id: nextId++,
                		title: "География: столицы",
                		questions: [
                    			{ text: "Столица Франции?", options: ["Берлин", "Мадрид", "Париж", "Лиссабон"], correct: 2 },
                    			{ text: "Столица Японии?", options: ["Сеул", "Пекин", "Токио", "Бангкок"], correct: 2 },
                    			{ text: "Столица Канады?", options: ["Торонто", "Оттава", "Ванкувер", "Монреаль"], correct: 1 }
                		]
            		},
			{
				id: nextId++,
                		title: "JavaScript Основы",
                		questions: [
                    			{ text: "Как объявить переменную в JS?", options: ["var", "let", "const", "Все варианты"], correct: 3 },
                    			{ text: "Что выведет typeof null?", options: ["null", "object", "undefined", "number"], correct: 1 }
                		]
            		}
        ];
}
function escapeHtml(str) {
	if (!str) return "";
	return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
}
