'use client'

import { API_URL } from '@/constants'
import { useAuth } from '@/features/auth'
import { useSafeContext } from '@/hooks'
import { SocketNamespace } from '@/types'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client'

type SocketsContext = Record<SocketNamespace, Socket | null>

const SocketsContext = createContext<SocketsContext>({} as SocketsContext)

export const SocketsProvider = ({ children }: PropsWithChildren) => {
	const [sockets, setSockets] = useState<SocketsContext>({
		invites: null,
		chat: null
	})

	const user = useAuth((s) => s.user)

	useEffect(() => {
		if (!user?.id) {
			return
		}

		const config: Partial<ManagerOptions & SocketOptions> = {
			withCredentials: true,
			reconnectionAttempts: 2,
		}

		const invitesSocket = io(API_URL + '/invites', {
			path: '/invites',
			...config
		})
		const chatSocket = io(API_URL + '/chat', {
			path: '/chat',
			...config
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
	}, [user?.id])

	return (
		<SocketsContext.Provider value={sockets}>
			{children}
		</SocketsContext.Provider>
	)
}
export const useSockets = () => useSafeContext(SocketsContext)

export const useSocket = (namespace: SocketNamespace) => {
	const context = useSafeContext(SocketsContext)
	return context[namespace]
}
