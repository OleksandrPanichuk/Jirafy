import { NextConfig } from "next"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const nextConfig: NextConfig = {
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
				hostname:"lh3.googleusercontent.com"
			}
		],
	},
}

export default nextConfig
