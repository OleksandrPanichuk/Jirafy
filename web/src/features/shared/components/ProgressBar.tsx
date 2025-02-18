'use client'
import { AppProgressBar } from 'next-nprogress-bar'

export const ProgressBar = () => {
	return (
		<AppProgressBar
			height="4px"
			options={{
				showSpinner: false
			}}
		/>
	)
}
