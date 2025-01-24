'use client'

import { useSafeContext } from '@/hooks'
import { absoluteApiUrl } from '@/lib'
import { SocketNamespace } from '@/types'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

type SocketsContext = Record<SocketNamespace, Socket | null>
const SocketsContext = createContext<SocketsContext>({} as SocketsContext)

export const SocketsProvider = ({ children }: PropsWithChildren) => {
	const [sockets, setSockets] = useState<SocketsContext>({
		invites: null,
		chat: null
	})

	useEffect(() => {
		const invitesSocket = io(absoluteApiUrl('/invites'), {
			addTrailingSlash: false,
			withCredentials: true,
		})
		const chatSocket = io(absoluteApiUrl('/chat'), {
			addTrailingSlash: false,
			withCredentials: true
		})

		invitesSocket.on('connect', () => {
			console.log('connected to invites socket')
		})

		chatSocket.on('connect', () => {
			console.log('connected to chat socket')
		})

		invitesSocket.on('disconnect', () => {
			console.log('disconnected from invites socket')
		})

		chatSocket.on('disconnect', () => {
			console.log('disconnected from chat socket')
		})

		setSockets({ invites: invitesSocket, chat: chatSocket })

		return () => {
			invitesSocket.disconnect()
			chatSocket.disconnect()
		}
	}, [])

	return (
		<SocketsContext.Provider value={sockets}>
			{children}
		</SocketsContext.Provider>
	)
}

export const useSocket = (namespace: SocketNamespace) => {
	const context = useSafeContext(SocketsContext)
	return context[namespace]
}
