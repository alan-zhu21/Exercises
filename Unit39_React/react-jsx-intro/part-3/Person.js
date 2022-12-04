const Person = ({ name, age, hobbies }) => {
	let reply;
	let displayName;
	if (age >= 18) {
		reply = 'Please go vote!';
	} else {
		reply = 'You must be 18';
	}
	if (name.length > 8) {
		displayName = name.slice(0, 6);
	} else {
		displayName = name;
	}
	return (
		<div>
			<p>Learn some information about this person</p>
			<p>Name: {displayName}</p>
			<p>Age: {age}</p>
			<h3>{reply}</h3>
			<ul>{hobbies.map((h) => <li>{h}</li>)}</ul>
		</div>
	);
};
