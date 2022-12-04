'use strict';

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
	storyList = await StoryList.getStories();
	$storiesLoadingMsg.remove();

	putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
	// console.debug("generateStoryMarkup", story);

	const hostName = story.getHostName();
	// check if they are logged in too
	// let starType = story.favorited === true ? 'fas fa-star' : 'far fa-star';
	// <i class="${starType}"></i>
	return $(`
      <li id="${story.storyId}">
        <span class="star">
        <i class="far fa-star"></i>
        </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage(location = $allStoriesList) {
	console.debug('putStoriesOnPage');
	location.empty();

	let workingList = location === $allStoriesList ? storyList.stories : currentUser.ownStories;

	if (currentUser.ownStories.length === 0 && workingList === currentUser.ownStories) {
		$myStories.append('There are currently no stories added by user!');
	}

	// loop through all of our stories and generate HTML for them
	for (let story of workingList) {
		const $story = generateStoryMarkup(story);
		location.append($story);
	}
	checkForFavorites();
	location.show();
}

/** Grabs values from the inputs for submitting a story, call addStory, and puts the new story onto the page */

async function createNewStory() {
	console.debug('createNewStory');
	let author = $navSubmitStoryForm[0][0].value;
	let title = $navSubmitStoryForm[0][1].value;
	let url = $navSubmitStoryForm[0][2].value;
	let storyObject = { title, author, url };
	let newStory = await storyList.addStory(currentUser, storyObject);
	let htmlStory = generateStoryMarkup(newStory);
	$allStoriesList.prepend(htmlStory);
	$navSubmitStoryForm.slideToggle('slow');
	$navSubmitStoryForm.trigger('reset');
}

$navSubmitStoryForm.on('submit', createNewStory);

function putFavoriteStoriesOnPage() {
	console.debug('putFavoriteStoriesOnPage');
	$favoriteListOfStories.empty();
	if (currentUser.favorites.length === 0) {
		$favoriteListOfStories.append('There are currently no favorites!');
	}
	for (let story of currentUser.favorites) {
		const storyInstance = new Story(story);
		const $story = generateStoryMarkup(storyInstance);
		$story.find('i')[0].className = 'fas fa-star';
		$favoriteListOfStories.prepend($story);
	}
}

$allStoriesList.on('click', '.fa-star', function(evt) {
	currentUser.toggleFavoriteStoryUI(evt);
	currentUser.modifyFavoriteStoryData(evt);
});

$favoriteListOfStories.on('click', '.fa-star', function(evt) {
	currentUser.toggleFavoriteStoryUI(evt);
	currentUser.modifyFavoriteStoryData(evt);
});

$myStories.on('click', '.fa-star', function(evt) {
	currentUser.toggleFavoriteStoryUI(evt);
	currentUser.modifyFavoriteStoryData(evt);
});

//checks for favorited stories from the returned list after refresh and stars them (based on favorited property in storyList instance)

// function checkForFavorites() {
// 	console.debug('checkForFavorites');
// 	for (let favoritedStory of currentUser.favorites) {
// 		let favoriteStoryId = favoritedStory.storyId;
// 		for (let story of storyList.stories) {
// 			if (story.storyId === favoriteStoryId) {
// 				//select the element and change the star
// 			}
// 		}
// 	}
// }

function checkForFavorites() {
	console.debug('checkForFavorites');
	let favorites = $('#all-stories-list li').filter(function(index) {
		return currentUser.favorites.map((s) => s.storyId).includes(this.id);
	});
	favorites.each((s) => (favorites[s].children[0].childNodes[1].className = 'fas fa-star'));

	let myStories = $('#my-stories li').filter(function(index) {
		return currentUser.favorites.map((s) => s.storyId).includes(this.id);
	});
	myStories.each((s) => (myStories[s].children[0].childNodes[1].className = 'fas fa-star'));
}

function addTrashCans() {
	$('#my-stories li').each(function() {
		$(this).prepend(`
    <span class="trash-can">
      <i class="fas fa-trash-alt"></i>
    </span>`);
	});
}

$myStories.on('click', '.fa-trash-alt', function(evt) {
	let storyId = evt.target.parentElement.parentElement.id;
	storyList.deleteStory(storyId);
});
