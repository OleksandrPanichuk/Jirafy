import { ChannelHeader } from '@/features/chat'

interface IPageProps {
	params: Promise<{
		channelId: string
	}>
}

const Page = async ({ params }: IPageProps) => {
	const { channelId } = await params
	// TODO: prefetch messages and channel info
	return (
		<div>
			<ChannelHeader />
		</div>
	)
}

export default Page
