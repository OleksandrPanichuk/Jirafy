'use client'

import { HeroUIProvider } from '@heroui/react'
import { PropsWithChildren } from 'react'

export const UIProvider = ({ children }: PropsWithChildren) => {
	return <HeroUIProvider>{children}</HeroUIProvider>
}
