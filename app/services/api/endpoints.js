export default {
	SIGNUP_API: '/api/auth/signup',
	SIGNIN_API: '/api/auth/login',
	ME_API: '/api/auth/me',

	AVAILABLE_USERNAME_API: '/api/users/available-username',
	AVAILABLE_EMAIL_API: '/api/users/available-email',
	GET_USER_BY_USERNAME_API: '/api/users/by-username/:username',
	USER_API: '/api/users/:userId',

	IMAGES_API: '/api/images',

	STORIES_API: '/api/stories',
	STORY_API: '/api/stories/:storyId',
	PUBLISH_STORY_API: '/api/stories/:storyId/publish',
	PUBLISHED_STORIES_BY_USER_API: '/api/stories/by-user/:userId',
	DRAFT_STORIES_BY_USER_API: '/api/stories/by-user/:userId/drafts',
};
