import React, { useState } from 'react';

function NewTodoForm({ addToDo }) {
	const [ formData, setFormData ] = useState('');
	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();
		addToDo(formData.task);
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="task">To Do:</label>
			<input id="task" type="text" name="task" placeholder="Write a To Do" onChange={handleChange} />
			<input type="submit" />
		</form>
	);
}

export default NewTodoForm;
