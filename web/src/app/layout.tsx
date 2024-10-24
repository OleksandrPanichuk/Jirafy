import { Notifications } from '@/features/notifications'
import { AuthProvider, QueryProvider } from '@/providers'
import { NextUIProvider } from '@nextui-org/react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Chatify',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='dark'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Notifications />
				<QueryProvider>
					<AuthProvider>
						<NextUIProvider>{children}</NextUIProvider>
					</AuthProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
