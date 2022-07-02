import React from 'react';

function Box(props) {
	return (
		<div
			style={{
				backgroundColor: props.color,
				width: props.width,
				height: props.height
			}}
		/>
	);
}

export default Box;
