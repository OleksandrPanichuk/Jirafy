import { NextConfig } from 'next'
import path from 'path'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${API_URL}/api/:path*`
			}
		]
	},
	images: {
		remotePatterns: [
			{
				hostname: 'lh3.googleusercontent.com'
			},
			{
				hostname: 'images.unsplash.com'
			},
			{
				hostname: 'res.cloudinary.com'
			}
		]
	},
	eslint: {
		ignoreDuringBuilds: true
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'src/styles')]
	},
	turbopack: {
		rules: {
			'*.scss': {
				loaders: ['sass-loader'],
				as: '*.scss'
			}
		}
	}
}

export default nextConfig
