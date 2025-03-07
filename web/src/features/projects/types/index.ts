import { FindAllProjectsWithFiltersInput } from '@/api'
import { OmitTyped } from '@/types'

export type TypeProjectsFilters = OmitTyped<
	FindAllProjectsWithFiltersInput,
	'slug'
>
