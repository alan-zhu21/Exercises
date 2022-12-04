import React from 'react';

const Clicker = () => {
	function printer() {
		console.log('you clicked me');
	}

	return <button onClick={(e) => console.log(e)}>Click Me!</button>;
};

export default Clicker;
