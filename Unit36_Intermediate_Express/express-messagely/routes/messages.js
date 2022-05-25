const jwt = require('jsonwebtoken');
const Router = require('express').Router;
const router = new Router();
const { SECRET_KEY } = require('../config');
const Message = require('../models/message');
const ExpressError = require('../expressError');
const { messagesFrom } = require('../models/user');
const { markRead } = require('../models/message');
const { ensureLoggedIn } = require('../middleware/auth');

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get('/:id', ensureLoggedIn, async (req, res, next) => {
	try {
		const { username } = req.user;
		const { id } = req.params;
		const message = await Message.get(id);
		if (username !== message.from_username && username !== message.to_username) {
			throw new ExpressError('Unauthorized', 401);
		}
		return res.json({ message: message });
	} catch (err) {
		next(err);
	}
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post('/', ensureLoggedIn, async (req, res, next) => {
	try {
		const { from_username } = req.user.username;
		const { to_username, body } = req.body;
		const result = await Message.create(from_username, to_username, body);
		return res.json({ message: result });
	} catch (err) {
		next(err);
	}
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post('/:id/read', ensureLoggedIn, async (req, res, next) => {
	try {
		const { id } = req.params;
		let { username } = req.user;
		const message = await Message.get(id);
		if (username !== message.from_username) {
			throw new ExpressError('Unauthorized', 401);
		}
		let result = await markRead(id);
		return res.json({ result });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
