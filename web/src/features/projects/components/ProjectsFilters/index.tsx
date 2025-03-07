'use client'

import { FiltersSelect } from './FiltersSelect'
import { OrderSelect } from './OrderSelect'
import { SearchInput } from './SearchInput'

export const ProjectsFilters = () => {
	return (
		<div className="flex items-center gap-2">
			<SearchInput />
			<OrderSelect />
			<FiltersSelect />
		</div>
	)
}
