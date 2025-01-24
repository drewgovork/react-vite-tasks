import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	// Храним массив шагов из data.json (он неизменяемый)
	const [steps] = useState(data);

	// Храним текущий активный индекс шага (по умолчанию 0 - первый шаг)
	const [activeIndex, setActiveIndex] = useState(0);

	// Флаг: проверяем, находимся ли мы на первом шаге
	const isFirstStep = activeIndex === 0;

	// Флаг: проверяем, находимся ли мы на последнем шаге
	const isLastStep = activeIndex === steps.length - 1;

	// Функция для перехода к следующему шагу
	const nextStep = () => {
		// Если это последний шаг, переходим к первому (начинаем сначала)
		// Иначе просто увеличиваем activeIndex
		setActiveIndex((prevIndex) => (isLastStep ? 0 : prevIndex + 1));
	};

	// Функция для перехода к предыдущему шагу
	const prevStep = () => {
		// Назад можно идти только если это не первый шаг
		if (!isFirstStep) {
			setActiveIndex((prevIndex) => prevIndex - 1);
		}
	};

	// Функция для перехода к конкретному шагу по индексу
	const goToStep = (index) => {
		setActiveIndex(index);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>

				{/* Контент активного шага */}
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>

					{/* Список шагов с кнопками */}
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => (
							<li
								key={step.id}
								// Добавляем классы:
								// - done (если шаг пройден или активен)
								// - active (если шаг текущий)
								className={`${styles['steps-item']} 
                    ${index <= activeIndex ? styles.done : ''} 
                    ${index === activeIndex ? styles.active : ''}`}
							>
								{/* Кнопка для перехода к шагу по индексу */}
								<button
									className={styles['steps-item-button']}
									onClick={() => goToStep(index)}
								>
									{index + 1}
								</button>
								{/* Название шага */}
								{step.title}
							</li>
						))}
					</ul>

					{/* Контейнер с кнопками управления */}
					<div className={styles['buttons-container']}>
						{/* Кнопка "Назад" (блокируется на первом шаге) */}
						<button
							className={styles.button}
							onClick={prevStep}
							disabled={isFirstStep}
						>
							Назад
						</button>

						{/* Кнопка "Далее" (или "Начать сначала" на последнем шаге) */}
						<button className={styles.button} onClick={nextStep}>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
