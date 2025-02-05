import { redirect } from 'next/navigation'
import { Routes } from '@/constants'

const ProfilePage = () => {
	return redirect(Routes.CREATE_WORKSPACE)
}

export default ProfilePage
