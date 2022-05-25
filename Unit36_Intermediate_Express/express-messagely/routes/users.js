const jwt = require('jsonwebtoken');
const Router = require('express').Router;
const router = new Router();
const { SECRET_KEY } = require('../config');
const User = require('../models/user');
const ExpressError = require('../expressError');
const { ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth');

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get('/', ensureLoggedIn, async function(req, res, next) {
	try {
		const all_users = await User.all();
		return res.json({ all_users });
	} catch (err) {
		next(err);
	}
});

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get('/:username', ensureCorrectUser, async function(req, res, next) {
	try {
		const { username } = req.params;
		const user = await User.get(username);
		return res.json({ user });
	} catch (err) {
		next(err);
	}
});

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get('/:username/to', ensureCorrectUser, async function(req, res, next) {
	try {
		const { username } = req.params;
		const messages = await User.messagesTo(username);
		return res.json({ messages });
	} catch (err) {
		next(err);
	}
});

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get('/:username/to', ensureCorrectUser, async function(req, res, next) {
	try {
		const { username } = req.params;
		const messages = await User.messagesFrom(username);
		return res.json({ messages });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
