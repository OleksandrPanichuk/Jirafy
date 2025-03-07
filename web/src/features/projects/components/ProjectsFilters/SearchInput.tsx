'use client'

import { IconSearch } from '@tabler/icons-react'
import { AnimatePresence, m } from 'framer-motion'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { useProjectsFiltersStore } from '../../providers'

export const SearchInput = () => {
	const [isExpanded, setIsExpanded] = useState(false)
	const searchValue = useProjectsFiltersStore((s) => s.searchValue)
	const setSearchValue = useProjectsFiltersStore((s) => s.setSearchValue)

	const inputRef = useRef<ElementRef<'input'>>(null)
	const containerRef = useRef<ElementRef<'form'>>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsExpanded(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	useEffect(() => {
		if (isExpanded && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isExpanded])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
	}
	return (
		<m.form
			ref={containerRef}
			className="relative flex items-center justify-end"
			onSubmit={handleSubmit}
			initial={false}
		>
		</m.form>
	)
}
