import { getChannelByName } from '@/api'
import { DEFAULT_CHANNEL_NAME, Routes } from '@/constants'
import { redirect } from 'next/navigation'

interface IPageProps {
	params: Promise<{
		slug: string
	}>
}

const Page = async ({ params }: IPageProps) => {
	const { slug } = await params
	const generalChannel = await getChannelByName(slug, DEFAULT_CHANNEL_NAME)


	if (!generalChannel) {
		throw new Error('Something went wrong')
	}

	return redirect(Routes.CHANNEL_BY_ID(slug, generalChannel.id))
}

export default Page
