import React, { useState } from 'react';
import NewTodoForm from './NewTodoForm';

function TodoList() {
	const [ toDos, setToDos ] = useState([]);

	function addToDo(task) {
		setToDos((toDos) => [ ...toDos, task ]);
	}

	function deleteToDo(e) {
		const toDo = document.getElementById(e.target.parentElement.id);
		toDo.remove();
	}

	return (
		<div>
			<NewTodoForm addToDo={addToDo} />
			{toDos.map((toDo, idx) => (
				<div id={`toDo-${idx}`}>
					<p style={{ display: 'inline' }}>{toDo} </p>
					<button onClick={deleteToDo} style={{ display: 'inline' }}>
						X
					</button>
				</div>
			))}
		</div>
	);
}

export default TodoList;
