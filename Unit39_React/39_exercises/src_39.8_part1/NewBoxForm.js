import React, { useState } from 'react';

function NewBoxForm({ addBox }) {
	const INITIAL_STATE = {
		width: '',
		height: '',
		backgroundColor: ''
	};
	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		addBox(formData.width, formData.height, formData.color);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="width">Width:</label>
			<input
				id="width"
				type="text"
				name="width"
				placeholder="px"
				value={formData.width}
				onChange={handleChange}
			/>
			<label htmlFor="height">Height:</label>
			<input
				id="height"
				type="text"
				name="height"
				placeholder="px"
				value={formData.height}
				onChange={handleChange}
			/>
			<label htmlFor="backgroundColor">Background Color:</label>
			<input
				id="color"
				type="text"
				name="color"
				placeholder="color"
				value={formData.color}
				onChange={handleChange}
			/>
			<input type="submit" />
		</form>
	);
}

export default NewBoxForm;
