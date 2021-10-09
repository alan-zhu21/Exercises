'use strict';

const BASE_URL = 'https://hack-or-snooze-v3.herokuapp.com';

/******************************************************************************
 * Story: a single story in the system
 */

class Story {
	/** Make instance of Story from data object about story:
   *   - {title, author, url, username, storyId, createdAt}
   */

	constructor({ storyId, title, author, url, username, createdAt, favorited }) {
		this.storyId = storyId;
		this.title = title;
		this.author = author;
		this.url = url;
		this.username = username;
		this.createdAt = createdAt;
		this.favorited = false;
	}

	/** Parses hostname out of URL and returns it. */

	getHostName() {
		// UNIMPLEMENTED: complete this function!
		return new URL(this.url).host;
	}
}

/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

class StoryList {
	constructor(stories) {
		this.stories = stories;
	}

	/** Generate a new StoryList. It:
   *
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.
   */

	static async getStories() {
		// Note presence of `static` keyword: this indicates that getStories is
		//  **not** an instance method. Rather, it is a method that is called on the
		//  class directly. Why doesn't it make sense for getStories to be an
		//  instance method?

		// query the /stories endpoint (no auth required)
		const response = await axios({
			url: `${BASE_URL}/stories`,
			method: 'GET'
		});

		// turn plain old story objects from API into instances of Story class
		const stories = response.data.stories.map((story) => new Story(story));

		// build an instance of our own class using the new array of stories
		return new StoryList(stories);
	}

	/** Adds story data to API, makes a Story instance, adds it to story list.
   * - user - the current instance of User who will post the story
   * - obj of {title, author, url}
   *
   * Returns the new Story instance
   */

	async addStory(user, { title, author, url } /* user, newStory */) {
		// UNIMPLEMENTED: complete this function!
		const token = user.loginToken;
		let response = await axios.post(`${BASE_URL}/stories`, {
			token,
			story: { title, author, url }
		});

		const story = new Story(response.data.story);
		this.stories.unshift(story);
		user.ownStories.unshift(story);

		return story;
	}

	async deleteStory(storyid) {
		let story = currentUser.ownStories.find((story) => story.id === storyid);
		const token = currentUser.loginToken;
		await axios.delete(`${BASE_URL}/stories/${storyid}`, {
			data: { token }
		});

		this.stories.shift(story);
		currentUser.ownStories.shift(story);

		navMyStoriesClick();
		navMyStoriesClick($allStoriesList);
	}
}

/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
	/** Make user instance from obj of user data and a token:
   *   - {username, name, createdAt, favorites[], ownStories[]}
   *   - token
   */

	constructor({ username, name, createdAt, favorites = [], ownStories = [] }, token) {
		this.username = username;
		this.name = name;
		this.createdAt = createdAt;

		// instantiate Story instances for the user's favorites and ownStories
		this.favorites = favorites.map((s) => new Story(s));
		this.ownStories = ownStories.map((s) => new Story(s));

		// store the login token on the user so it's easy to find for API calls.
		this.loginToken = token;
	}

	/** Register new user in API, make User instance & return it.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

	static async signup(username, password, name) {
		const response = await axios({
			url: `${BASE_URL}/signup`,
			method: 'POST',
			data: { user: { username, password, name } }
		});

		let { user } = response.data;

		return new User(
			{
				username: user.username,
				name: user.name,
				createdAt: user.createdAt,
				favorites: user.favorites,
				ownStories: user.stories
			},
			response.data.token
		);
	}

	/** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

	static async login(username, password) {
		const response = await axios({
			url: `${BASE_URL}/login`,
			method: 'POST',
			data: { user: { username, password } }
		});

		let { user } = response.data;

		return new User(
			{
				username: user.username,
				name: user.name,
				createdAt: user.createdAt,
				favorites: user.favorites,
				ownStories: user.stories
			},
			response.data.token
		);
	}

	/** When we already have credentials (token & username) for a user,
   *   we can log them in automatically. This function does that.
   */

	static async loginViaStoredCredentials(token, username) {
		try {
			const response = await axios({
				url: `${BASE_URL}/users/${username}`,
				method: 'GET',
				params: { token }
			});

			let { user } = response.data;

			return new User(
				{
					username: user.username,
					name: user.name,
					createdAt: user.createdAt,
					favorites: user.favorites,
					ownStories: user.stories
				},
				token
			);
		} catch (err) {
			console.error('loginViaStoredCredentials failed', err);
			return null;
		}
	}

	// Section for favoriting stories

	// UI - updates the star

	toggleFavoriteStoryUI(evt) {
		console.debug('toggleFavoriteStoryUI');

		if (evt.target.getAttribute('class') === 'far fa-star') {
			evt.target.setAttribute('class', 'fas fa-star');
		} else {
			evt.target.setAttribute('class', 'far fa-star');
		}
	}

	// adds favorite story to favorites array in currentUser object and updates the favorited property in storyList

	// async modifyFavoriteStoryData(evt) {
	// 	let storyID = evt.currentTarget.parentElement.id;
	// 	for (let story of storyList.stories) {
	// 		if (story.storyId === storyID) {
	// 			if (story.favorited === true) {
	// 				await this.removeFavoriteStory(storyID);
	// 				story.favorited = false;
	// 				this.favorites.shift(story);
	// 			} else {
	// 				await this.addFavoriteStory(storyID);
	// 				story.favorited = true;
	// 				this.favorites.unshift(story);
	// 			}
	// 		}
	// 	}
	// }

	async modifyFavoriteStoryData(evt) {
		console.debug('modifyFavoriteStoryData');
		let storyID = evt.target.parentElement.parentElement.id;
		// console.log(storyID);
		// console.log(evt);
		// console.log(evt.target.className);
		if (evt.target.className === 'fas fa-star') {
			await this.addFavoriteStory(storyID);
		} else {
			await this.removeFavoriteStory(storyID);
		}
	}

	async addFavoriteStory(storyid) {
		console.debug('addFavoriteStory');
		let response = await axios.post(`${BASE_URL}/users/${this.username}/favorites/${storyid}`, {
			token: this.loginToken
		});
		this.favorites = response.data.user.favorites;
	}

	async removeFavoriteStory(storyid) {
		console.debug('removeFavoriteStory');
		let response = await axios.delete(`${BASE_URL}/users/${this.username}/favorites/${storyid}`, {
			data: { token: this.loginToken }
		});
		this.favorites = response.data.user.favorites;
	}
}
