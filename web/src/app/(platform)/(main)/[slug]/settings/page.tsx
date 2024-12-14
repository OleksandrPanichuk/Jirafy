import {
	DeleteWorkspaceAccordion,
	UpdateWorkspaceForm
} from '@/features/workspaces'

const WorkspaceSettingsPage = () => {
	return (
		<div>
			<UpdateWorkspaceForm />
			<DeleteWorkspaceAccordion />
		</div>
	)
}

export default WorkspaceSettingsPage
