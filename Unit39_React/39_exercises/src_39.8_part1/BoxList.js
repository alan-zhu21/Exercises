import React, { useState } from 'react';
import Box from './Box';
import NewBoxForm from './NewBoxForm';

function BoxList() {
	const [ boxes, setBoxes ] = useState([ {} ]);

	function addBox(width, height, color) {
		setBoxes((boxes) => [ ...boxes, { width, height, color } ]);
	}

	return (
		<div>
			<NewBoxForm addBox={addBox} />
			{boxes.map((box) => <Box color={box.color} width={box.width} height={box.height} />)}
		</div>
	);
}

export default BoxList;
