import { ChannelHeader } from '@/features/chat'
import { RichTextInput } from '@/features/editor'

interface IPageProps {
	params: Promise<{
		channelId: string
	}>
}

const Page = async ({ params }: IPageProps) => {
	const { channelId } = await params
	// TODO: prefetch messages and channel info
	return (
		<div className="h-screen flex flex-col">
			<ChannelHeader />
			<div className="flex-1" />
			<RichTextInput />
		</div>
	)
}

export default Page
