import { useState } from 'react';
import styles from './Game.module.css';
import { Field } from './Field';
import { Information } from './Information';

export const Game = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X');

	const [isGameEnded, setIsGameEnded] = useState(false);

	const [isDraw, setIsDraw] = useState(false);

	const [field, setField] = useState(Array(9).fill(''));

	const WIN_PATTERNS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const handleCellClick = (index) => {
		if (field[index] || isGameEnded) return;

		const newField = [...field];
		newField[index] = currentPlayer;
		setField(newField);

		if (checkWinner(newField)) {
			setIsGameEnded(true);
			return;
		}

		if (!newField.includes('')) {
			setIsDraw(true);
			return;
		}

		setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
	};

	const checkWinner = (board) => {
		return WIN_PATTERNS.some((pattern) =>
			pattern.every((index) => board[index] === currentPlayer),
		);
	};

	const restartGame = () => {
		setField(Array(9).fill(''));
		setCurrentPlayer('X');
		setIsGameEnded(false);
		setIsDraw(false);
	};

	return (
		<div className={styles.game}>
			<h1 className={styles.title}>Крестики-Нолики</h1>

			<Information
				currentPlayer={currentPlayer}
				isDraw={isDraw}
				isGameEnded={isGameEnded}
			/>

			<Field field={field} handleCellClick={handleCellClick} />

			<button className={styles.restartButton} onClick={restartGame}>
				Начать заново
			</button>
		</div>
	);
};
