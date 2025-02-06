import { useEffect } from 'react'
import { io } from 'socket.io-client'

function App() {
	useEffect(() => {
		const socket = io('http://localhost:8080/invites', {
			reconnectionAttempts: 4,
			path: '/invites'
		})

		socket.on('connect', () => {
			console.log('connected to invites socket')
		})
  

		socket.on('message', (data) => console.log(data))
		socket.on('disconnect', () => {
			console.log('disconnected from invites socket')
		})

		return () => {
			socket.disconnect()
		}
	}, [])
	return (
		<>
			<div></div>
		</>
	)
}

export default App
