class ExpressError extends Error {
	constructor(msg, status_code) {
		super();
		this.msg = msg;
		this.status_code = status_code;
		console.error(this.stack);
	}
}

module.exports = ExpressError;
