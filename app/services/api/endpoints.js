export default {
	SIGNUP_API: '/api/auth/signup',
	SIGNIN_API: '/api/auth/login',
	ME_API: '/api/auth/me',

	AVAILABLE_USERNAME_API: '/api/users/available-username',
	AVAILABLE_EMAIL_API: '/api/users/available-email',
	GET_USER_BY_USERNAME_API: '/api/users/by-username/:username',
	USER_API: '/api/users/:userId',
	FOLLOW_TO_USER_API: '/api/users/:userId/follow',
	UNFOLLOW_TO_USER_API: '/api/users/:userId/unfollow',

	IMAGES_API: '/api/images',

	STORIES_API: '/api/stories',
	STORY_API: '/api/stories/:storyId',
	STORY_COMMENTARY_API: '/api/stories/:storyId/commentary',
	PUBLICATION_API: '/api/stories/:storyId/publication',
	PUBLISH_STORY_API: '/api/stories/:storyId/publish',
	PUBLISHED_STORIES_BY_USER_API: '/api/stories/by-user/:userId',
	RECOMMENDS_STORIES_BY_USER_API: '/api/stories/recommends/:userId',
	LATESTS_STORIES_API: '/api/stories/latests',
	DRAFT_STORIES_BY_USER_API: '/api/stories/by-user/:userId/drafts',
};
