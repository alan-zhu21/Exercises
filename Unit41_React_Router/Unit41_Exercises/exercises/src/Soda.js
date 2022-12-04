import React from 'react';
import { Link } from 'react-router-dom';

function Soda() {
	return (
		<div>
			<h3>Soda</h3>
			<img
				src="https://images.albertsons-media.com/is/image/ABS/108010259"
				width="200px"
				height="200px"
				alt="soda"
				style={{ display: 'inline-block' }}
			/>
			<p>
				<Link to="/">go back</Link>
			</p>
		</div>
	);
}

export default Soda;
