'use client'

import { Button, Progress } from '@heroui/react'
import {
	IconMicrophone,
	IconPlayerPause,
	IconPlayerPlay,
	IconTrash
} from '@tabler/icons-react'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface VoiceMessage {
	id: string
	blob: Blob
	duration: number
}

interface VoiceRecorderProps {
	onVoiceMessage: (voiceMessage: VoiceMessage) => void
	maxDuration?: number // in seconds
	autoSend?: boolean // automatically send when recording stops
}

export const VoiceRecorder = ({
	onVoiceMessage,
	maxDuration = 300,
	autoSend = false
}: VoiceRecorderProps) => {
	const [isRecording, setIsRecording] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const [duration, setDuration] = useState(0)
	const [playbackTime, setPlaybackTime] = useState(0)
	const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
	const [audioUrl, setAudioUrl] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	const mediaRecorderRef = useRef<MediaRecorder | null>(null)
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const timerRef = useRef<NodeJS.Timeout | null>(null)
	const chunksRef = useRef<Blob[]>([])
	const streamRef = useRef<MediaStream | null>(null)

	// Clean up function
	const cleanup = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current)
			timerRef.current = null
		}
		if (streamRef.current) {
			streamRef.current.getTracks().forEach((track) => track.stop())
			streamRef.current = null
		}
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state === 'recording'
		) {
			mediaRecorderRef.current.stop()
		}
		mediaRecorderRef.current = null
	}, [])

	const cleanupAudioUrl = useCallback(() => {
		if (audioUrl) {
			URL.revokeObjectURL(audioUrl)
		}
	}, [audioUrl])

	const startRecording = async () => {
		try {
			setError(null)

			// Check if mediaDevices is supported
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				throw new Error('Media devices API not supported in this browser')
			}

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					sampleRate: 44100
				}
			})

			streamRef.current = stream

			// Check if MediaRecorder is supported
			if (!window.MediaRecorder) {
				throw new Error('MediaRecorder not supported in this browser')
			}

			// Get supported MIME types
			const mimeTypes = [
				'audio/webm;codecs=opus',
				'audio/webm',
				'audio/mp4',
				'audio/ogg;codecs=opus'
			]

			let selectedMimeType = ''
			for (const mimeType of mimeTypes) {
				if (MediaRecorder.isTypeSupported(mimeType)) {
					selectedMimeType = mimeType
					break
				}
			}

			if (!selectedMimeType) {
				selectedMimeType = 'audio/webm' // fallback
			}

			const mediaRecorder = new MediaRecorder(stream, {
				mimeType: selectedMimeType
			})
			mediaRecorderRef.current = mediaRecorder
			chunksRef.current = []

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data)
				}
			}

			mediaRecorder.onstop = () => {
				const blob = new Blob(chunksRef.current, {
					type: selectedMimeType
				})
				setAudioBlob(blob)

				// Clean up previous URL before creating new one
				cleanupAudioUrl()
				const newUrl = URL.createObjectURL(blob)
				setAudioUrl(newUrl)

				// Stop all tracks to release microphone
				if (streamRef.current) {
					streamRef.current.getTracks().forEach((track) => track.stop())
					streamRef.current = null
				}

				// Auto-send if enabled
				if (autoSend) {
					const voiceMessage: VoiceMessage = {
						id: Date.now().toString(),
						blob: blob,
						duration
					}
					onVoiceMessage(voiceMessage)
					// Clean up after auto-send
					setTimeout(() => {
						cleanupAudioUrl()
						setAudioBlob(null)
						setAudioUrl(null)
						setDuration(0)
						setPlaybackTime(0)
						setIsPlaying(false)
						setError(null)
					}, 100)
				}
			}

			mediaRecorder.onerror = (event) => {
				console.error('MediaRecorder error:', event)
				setError('Recording failed. Please try again.')
				cleanup()
			}

			mediaRecorder.start(100) // Collect data every 100ms
			setIsRecording(true)
			setDuration(0)

			// Start timer
			timerRef.current = setInterval(() => {
				setDuration((prev) => {
					const newDuration = prev + 1
					if (newDuration >= maxDuration) {
						stopRecording()
					}
					return newDuration
				})
			}, 1000)
		} catch (error) {
			console.error('Error accessing microphone:', error)
			setError('Could not access microphone')

			if (error instanceof Error) {
				if (error.name === 'NotAllowedError') {
					setError(
						'Microphone access denied. Please allow microphone permissions to record voice messages.'
					)
				} else if (error.name === 'NotFoundError') {
					setError(
						'No microphone found. Please connect a microphone to record voice messages.'
					)
				} else if (error.name === 'NotSupportedError') {
					setError('Voice recording is not supported in this browser.')
				} else {
					setError(`Could not access microphone: ${error.message}`)
				}
			}

			// Clean up on error
			cleanup()
		}
	}

	const stopRecording = useCallback(() => {
		if (mediaRecorderRef.current && isRecording) {
			mediaRecorderRef.current.stop()
			setIsRecording(false)

			if (timerRef.current) {
				clearInterval(timerRef.current)
				timerRef.current = null
			}
		}
	}, [isRecording])

	const playRecording = useCallback(() => {
		if (audioUrl && audioRef.current) {
			audioRef.current.currentTime = playbackTime
			audioRef.current
				.play()
				.then(() => setIsPlaying(true))
				.catch((error) => {
					console.error('Error playing audio:', error)
					setError('Could not play recording')
				})
		}
	}, [audioUrl, playbackTime])

	const pauseRecording = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.pause()
			setIsPlaying(false)
		}
	}, [])

	const deleteRecording = useCallback(() => {
		cleanupAudioUrl()
		setAudioBlob(null)
		setAudioUrl(null)
		setDuration(0)
		setPlaybackTime(0)
		setIsPlaying(false)
		setError(null)
	}, [cleanupAudioUrl])

	const sendVoiceMessage = useCallback(() => {
		if (audioBlob) {
			const voiceMessage: VoiceMessage = {
				id: Date.now().toString(),
				blob: audioBlob,
				duration
			}

			onVoiceMessage(voiceMessage)
			deleteRecording()
		}
	}, [audioBlob, duration, onVoiceMessage, deleteRecording])

	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
	}

	// Set up audio event listeners
	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return

		const handleLoadedMetadata = () => {
			if (audio.duration && !isNaN(audio.duration)) {
				// Audio loaded successfully
			}
		}

		const handleTimeUpdate = () => {
			if (audio.currentTime !== undefined) {
				setPlaybackTime(audio.currentTime)
			}
		}

		const handleEnded = () => {
			setIsPlaying(false)
			setPlaybackTime(0)
			audio.currentTime = 0
		}

		const handleError = () => {
			setError('Error playing audio')
			setIsPlaying(false)
		}

		audio.addEventListener('loadedmetadata', handleLoadedMetadata)
		audio.addEventListener('timeupdate', handleTimeUpdate)
		audio.addEventListener('ended', handleEnded)
		audio.addEventListener('error', handleError)

		return () => {
			audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
			audio.removeEventListener('timeupdate', handleTimeUpdate)
			audio.removeEventListener('ended', handleEnded)
			audio.removeEventListener('error', handleError)
		}
	}, [audioUrl])

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			cleanup()
			cleanupAudioUrl()
		}
	}, [cleanup, cleanupAudioUrl])

	// Show error state
	if (error) {
		return (
			<div className="flex items-center gap-2 p-2 bg-danger-100 text-danger-900 rounded-lg">
				<span className="text-sm">{error}</span>
				<Button
					size="sm"
					color="danger"
					variant="light"
					onPress={() => setError(null)}
				>
					Dismiss
				</Button>
			</div>
		)
	}
	if (audioBlob && !autoSend) {
		const progressValue = duration > 0 ? (playbackTime / duration) * 100 : 0

		return (
			<div className="flex items-center gap-2 p-2 bg-content2 rounded-lg">
				<audio ref={audioRef} src={audioUrl || undefined} preload="metadata" />

				<Button
					isIconOnly
					size="sm"
					variant="ghost"
					onPress={isPlaying ? pauseRecording : playRecording}
					disabled={!audioUrl}
				>
					{isPlaying ? (
						<IconPlayerPause size={16} />
					) : (
						<IconPlayerPlay size={16} />
					)}
				</Button>

				<div className="flex-1">
					<div className="text-xs text-content2-foreground">
						Voice message • {formatDuration(duration)}
					</div>
					<Progress size="sm" value={progressValue} className="w-full" />
				</div>

				<Button
					isIconOnly
					size="sm"
					variant="ghost"
					color="danger"
					onPress={deleteRecording}
				>
					<IconTrash size={16} />
				</Button>

				<Button size="sm" color="primary" onPress={sendVoiceMessage}>
					Send
				</Button>
			</div>
		)
	}
	if (isRecording) {
		return (
			<div className="flex items-center gap-2 p-2 bg-danger-100 text-danger-900 rounded-lg">
				<div className="w-3 h-3 bg-danger rounded-full animate-pulse"></div>
				<span className="text-sm font-medium">
					Recording{autoSend ? ' (auto-send)' : ''}...{' '}
					{formatDuration(duration)}
				</span>
				<Progress
					size="sm"
					value={(duration / maxDuration) * 100}
					color="danger"
					className="flex-1"
				/>
				<Button
					size="sm"
					color="danger"
					variant="solid"
					onPress={stopRecording}
				>
					Stop
				</Button>
			</div>
		)
	}
	return (
		<Button
			isIconOnly
			size="sm"
			variant="ghost"
			color="default"
			className="h-6 w-6 min-w-6"
			onPress={startRecording}
			title={
				autoSend ? 'Record voice message (auto-send)' : 'Record voice message'
			}
		>
			<IconMicrophone size={14} />
		</Button>
	)
}
