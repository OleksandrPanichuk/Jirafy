import { currentUser } from '@/api'
import { AuthProvider } from '@/features/auth'
import { ProgressBar } from '@/features/shared'
import { Notifications } from '@/features/toast'
import { QueryProvider, SocketsProvider, UIProvider } from '@/providers'
import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({
	display: 'swap',
	weight: ['400', '500'],
	variable: '--font-inter',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Jirafy'
}

export default async function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	const user = await currentUser()

	return (
		<html lang="en" className={'dark'} suppressHydrationWarning>
			<head>
				<link
					rel="icon"
					type="image/png"
					href="/favicon-48x48.png"
					sizes="48x48"
				/>
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body
				className={`${inter.variable} ${inter.className} antialiased bg-tw-bg-90 min-h-screen`}
			>
				<ProgressBar />
				<Notifications />
				<QueryProvider>
					<AuthProvider initialUser={user}>
						<SocketsProvider>
							<UIProvider>{children}</UIProvider>
						</SocketsProvider>
					</AuthProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
