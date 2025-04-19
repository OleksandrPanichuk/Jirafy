interface IPageProps {
	params: Promise<{
		channelId: string
	}>
}

const Page = async ({ params }: IPageProps) => {
	const { channelId } = await params
	// TODO: prefetch channel info and messages
	return <div>{channelId}</div>
}

export default Page
