import PropTypes from 'prop-types';
import styles from './Information.module.css';

export const Information = ({ currentPlayer, isDraw, isGameEnded }) => {
	let message;

	if (isDraw) {
		message = 'Ничья!';
	} else if (isGameEnded) {
		message = `Победитель: ${currentPlayer}`;
	} else {
		message = `Ходит: ${currentPlayer}`;
	}

	return <div className={styles.info}>{message}</div>;
};

Information.propTypes = {
	currentPlayer: PropTypes.string.isRequired,
	isDraw: PropTypes.bool.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
};
