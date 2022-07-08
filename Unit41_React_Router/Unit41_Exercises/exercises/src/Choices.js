import React from 'react';
import { Link } from 'react-router-dom';
import './Choices.css';

function Choices() {
	return (
		<div className="Choices">
			<Link to="/soda">Soda</Link>
			<Link to="/chips">Chips</Link>
			<Link to="/fish">Fish</Link>
		</div>
	);
}

export default Choices;
