import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [result, setResult] = useState(null);

	const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

	// Ввод чисел
	const handleNumberClick = (num) => {
		if (result !== null) {
			// Если уже есть результат — начинаем заново
			setOperand1(num);
			setOperator('');
			setOperand2('');
			setResult(null);
		} else if (!operator) {
			setOperand1((prev) => prev + num);
		} else {
			setOperand2((prev) => prev + num);
		}
	};

	// Ввод оператора
	const handleOperatorClick = (op) => {
		if (operand1 && !operator) {
			setOperator(op);
		}
	};

	// Вычисление
	const handleEqualClick = () => {
		if (operand1 && operator && operand2) {
			const num1 = parseInt(operand1, 10);
			const num2 = parseInt(operand2, 10);
			const res = operator === '+' ? num1 + num2 : num1 - num2;
			setResult(res);
		}
	};

	// Сброс
	const handleClearClick = () => {
		setOperand1('');
		setOperator('');
		setOperand2('');
		setResult(null);
	};

	return (
		<div className={styles.calculator}>
			{/* Дисплей */}
			<div className={`${styles.display} ${result !== null ? styles.result : ''}`}>
				{result !== null ? result : `${operand1} ${operator} ${operand2}`}
			</div>

			{/* Кнопки цифр */}
			<div className={styles.buttons}>
				{NUMS.map((num) => (
					<button
						key={num}
						className={styles.button}
						onClick={() => handleNumberClick(num)}
					>
						{num}
					</button>
				))}
			</div>

			{/* Кнопки операций */}
			<div className={styles.controls}>
				<button className={styles.clear} onClick={handleClearClick}>
					C
				</button>
				<button
					className={styles.operator}
					onClick={() => handleOperatorClick('+')}
				>
					+
				</button>
				<button
					className={styles.operator}
					onClick={() => handleOperatorClick('-')}
				>
					-
				</button>
				<button className={styles.equal} onClick={handleEqualClick}>
					=
				</button>
			</div>
		</div>
	);
};
