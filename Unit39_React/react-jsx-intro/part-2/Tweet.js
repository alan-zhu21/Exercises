const Tweet = ({ username, fullname, date, message }) => {
	return (
		<p>
			{username} {fullname} {date} {message}
		</p>
	);
};
