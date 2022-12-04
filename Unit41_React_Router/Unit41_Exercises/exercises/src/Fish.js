import React from 'react';
import { Link } from 'react-router-dom';

function Fish() {
	return (
		<div>
			<h3>Fish</h3>
			<img
				width="200px"
				height="200px"
				src="https://i.insider.com/57a4db38dd089551028b465b?width=1136&format=jpeg"
				alt="fish"
				style={{ display: 'inline-block' }}
			/>
			<p>
				<Link to="/">go back</Link>
			</p>
		</div>
	);
}

export default Fish;
