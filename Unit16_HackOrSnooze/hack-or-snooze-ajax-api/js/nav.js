'use strict';

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
	console.debug('navAllStories', evt);
	hidePageComponents();
	putStoriesOnPage();
}

$body.on('click', '#nav-all', navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
	console.debug('navLoginClick', evt);
	hidePageComponents();
	$loginForm.show();
	$signupForm.show();
}

$navLogin.on('click', navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
	console.debug('updateNavOnLogin');
	$('.main-nav-links').show();
	$navLogin.hide();
	$navLogOut.show();
	$navUserProfile.text(`${currentUser.username}`).show();
}

/** When a user clicks the submit anchor tag in the nav bar, it will initiate submitting a story*/

// function navSubmitStoryClick() {
//   $submitStoryForm.append(`
//   <label for="author" style="display:inline">Author</label>
//   <input id="author" style="display:inline" placeholder="author">
//   <label for="title">Title</label>
//   <input id="title" style="display:inline" placeholder="title">
//   <label for="URL">URL</label>
//    <input id="url" style="display:inline" placeholder="url">
//   `).show();
// }

function navSubmitStoryClick() {
	console.debug('navSubmitStoryClick');
	$navSubmitStoryForm.toggle();
}

$navSubmitButton.on('click', navSubmitStoryClick);

function navFavoriteStoriesClick() {
	console.debug('navFavoriteStoriesClick');
	putFavoriteStoriesOnPage();
	hidePageComponents();
	$favoriteListOfStories.show();
}

$navFavoriteStoriesButton.on('click', navFavoriteStoriesClick);

function navMyStoriesClick() {
	hidePageComponents();
	putStoriesOnPage($myStories);
	addTrashCans();
	$myStories.show();
}

$navMyStoriesButton.on('click', navMyStoriesClick);
