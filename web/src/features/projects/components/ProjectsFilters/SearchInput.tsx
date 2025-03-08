'use client'

import { IconSearch, IconX } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { useProjectsFiltersStore } from '@/features/projects'

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

	const handleReset = () => {
		setSearchValue('')
		setIsExpanded(false)
	}
	return (
		<div className={'flex justify-end'}>
			<AnimatePresence>
				{!isExpanded && (
					<motion.button
						initial={{
							opacity: 0,
							scale: 0
						}}
						animate={{
							opacity: 1,
							scale: 1,
							transition: { duration: 0.2 }
						}}
						exit={{
							opacity: 0,
							scale: 0,
							transition: { duration: 0.2 }
						}}
						className={
							' p-2 hover:bg-tw-bg-80 rounded text-tw-text-400  grid place-items-center'
						}
						onClick={() => setIsExpanded(true)}
					>
						<IconSearch className={'size-3.5 '} />
					</motion.button>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{isExpanded && (
					<motion.form
						initial={{ width: 0, opacity: 0 }}
						animate={{
							width: '100%',
							opacity: 1,
							transition: { duration: 0.2 }
						}}
						exit={{ width: 0, opacity: 0, transition: { duration: 0.2 } }}
						className={
							' flex items-center justify-start gap-1 rounded-md border bg-tw-bg-100 text-tw-text-400  overflow-hidden w-30 md:w-64 px-2.5 py-1.5 border-tw-border-200 '
						}
						ref={containerRef}
					>
						<IconSearch className={'size-3.5 flex-shrink-0'} />
						<motion.input
							className={
								'w-full max-w-[234px] border-none bg-transparent text-sm text-tw-text-100 placeholder:text-tw-text-400 focus:outline-none'
							}
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder={'Search'}
							ref={inputRef}
						/>
						<button
							onClick={handleReset}
							className={' grid place-items-center'}
							type={'reset'}
						>
							<IconX className={'size-3'} />
						</button>
					</motion.form>
				)}
			</AnimatePresence>
		</div>
	)
}
