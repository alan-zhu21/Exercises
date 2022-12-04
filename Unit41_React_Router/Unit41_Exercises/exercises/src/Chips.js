import React from 'react';
import { Link } from 'react-router-dom';

function Chips() {
	return (
		<div>
			<h3>Chips</h3>
			<img
				width="200px"
				height="200px"
				src="https://m.media-amazon.com/images/I/81vJyb43URL._SL1500_.jpg"
				alt="chips"
				style={{ display: 'inline-block' }}
			/>
			<p>
				<Link to="/">go back</Link>
			</p>
		</div>
	);
}

export default Chips;
