"use client"
import { toast } from "@/features/toast"
import { useState } from "react"

export const useCopy = (withToast:boolean = false): [boolean, (value:string) => void] => {
	const [copied, setCopied] = useState(false)

	const copy = (value:string) =>  {
		if(!navigator?.clipboard) {
			console.warn('Clipboard not supported')
			setCopied(false)
			return
		}
		navigator.clipboard.writeText(value)
		setCopied(true)
		
		withToast && toast.info('Copied to clipboard')

		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	return [copied, copy]
}