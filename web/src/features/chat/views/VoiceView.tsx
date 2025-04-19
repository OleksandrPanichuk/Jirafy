'use client'

import { useParams } from 'next/navigation'

export const VoiceView = () => {
	const params = useParams()

	const channelId = params.channelId as string | undefined

	if (!channelId) {
        console.error(
            'Channel ID is undefined. A valid "channelId" route parameter is required to initialize the voice view. ' +
            `Received params: ${JSON.stringify(params)}`
        )
		throw new Error('Channel ID is required')
	}

	return <div>VoiceView</div>
}
