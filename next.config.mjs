/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
		  // Basic redirect
		  {
			source: '/index.html',
			destination: '/',
			permanent: true,
		  },
		]
	  },
};

export default nextConfig;
