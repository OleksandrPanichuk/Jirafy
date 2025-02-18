import { ModalType, TypeData } from './DeleteConfirmationModal.types'

export const data: Record<ModalType, TypeData> = {
	workspace: {
		title:"Delete workspace",
		description: {
			"1":"Are you sure you want to delete workspace",
			"2":"? All of the data related to the workspace will be permanently removed. This action cannot be undone."
		},
		nameInput: {
			label :"Enter the workspace name",
			placeholder:"Workspace name"
		},
		phraseInput: {
			label:"delete my workspace",
			placeholder:"Enter 'delete my workspace'",
			value:"delete my workspace"
		}
	},
	project: {
		title: 'Delete project',
		description: {
			1: 'Are you sure you want to delete project',
			2: '? All of the data related to the project will be permanently removed. This action cannot be undone'
		},
		nameInput: {
			label: "Enter the project name",
			placeholder: 'Project name'
		},
		phraseInput: {
			label: "delete my project",
			placeholder: "Enter 'delete my project'",
			value: 'delete my project'
		}
	}
}
