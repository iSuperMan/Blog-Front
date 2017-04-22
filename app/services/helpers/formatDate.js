export default dateString => (new Date(dateString))
	.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
