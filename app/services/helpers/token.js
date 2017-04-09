const TOKEN_KEY = 'token-key-value';

export default {
	set: val => localStorage.setItem(TOKEN_KEY, val),
	get: () => localStorage.getItem(TOKEN_KEY) || '',
	isHas: () => !!localStorage.getItem(TOKEN_KEY),
	remove: () => localStorage.removeItem(TOKEN_KEY),
};
