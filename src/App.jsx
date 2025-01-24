import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const isValueValid = value.length >= 3;

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение:');

		if (!promptValue || promptValue.trim().length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			return;
		}

		setValue(promptValue.trim());
		setError('');
	};

	const onAddButtonClick = () => {
		if (!isValueValid) return;

		const newItem = {
			id: Date.now(),
			value: value,
			date: new Date().toLocaleString(),
		};

		setList([...list, newItem]);
		setValue('');
		setError('');
	};

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles.pageHeading}>Ввод значения</h1>
				<p className={styles.noMarginText}>
					Текущее значение:
					<output className={styles.currentValue}>{value}</output>
				</p>
				<div className={styles.error}>{error && <p>{error}</p>}</div>
				<div className={styles.buttonsContainer}>
					<button className={styles.button} onClick={onInputButtonClick}>
						Ввести новое
					</button>
					<button
						className={styles.button}
						disabled={!isValueValid}
						onClick={onAddButtonClick}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles.listContainer}>
					<h2 className={styles.listHeading}>Список:</h2>
					{list.length === 0 ? (
						<p className={styles.noMarginText}>Нет добавленных элементов</p>
					) : (
						<ul className={styles.list}>
							{list.map((item) => (
								<li key={item.id} className={styles.listItem}>
									{item.date} — <b>{item.value}</b>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
};
