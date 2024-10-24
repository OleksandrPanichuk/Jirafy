const API_URL = process.env.NEXT_PUBLIC_API_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${API_URL}/api/:path*`,
			},
		]
	},
	images: {
		remotePatterns: [
			{
				hostname: 'assets.aceternity.com',
			},
		],
	},
}

export default nextConfig
