/*eslint no-undef: "off"*/
module.exports = {
	hostname: '127.0.0.1',
	port: '8090',
	root: process.cwd(),
	compress: /\.(html|js|css|md|txt)/,
	cache: {
		maxAge: 43200,
		cacheControl: true,
		expires: true,
		lastModified: true,
		etag: true
	}
};
