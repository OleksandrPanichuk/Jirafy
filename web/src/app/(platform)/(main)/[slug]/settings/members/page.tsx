import { MembersTable } from "@/features/members"
import { MemberType } from "@/types"

interface IPageProps {
	params: {
		slug: string
	}
}

const WorkspaceMembersPage = ({ params }: IPageProps) => {
	return (
		<div>
			<MembersTable type={MemberType.WORKSPACE} identifier={params.slug} />
		</div>
	)
}

export default WorkspaceMembersPage
