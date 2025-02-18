import { Logo } from '@/features/shared'
import { IconLoader2 } from '@tabler/icons-react'

export const VerificationProcess = () => (
	<div className="w-full h-[90vh] items-center justify-center flex flex-col">
		<Logo />
		<div className="flex items-center gap-2 mt-3">
			<IconLoader2 className="animate-spin size-6" />
			Verifying in process
		</div>
	</div>
)
