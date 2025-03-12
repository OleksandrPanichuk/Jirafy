import { FindAllProjectsWithFiltersInput } from '@/api'
import { OmitTyped } from '@/types'

export type TypeProjectsFilters = OmitTyped<
	FindAllProjectsWithFiltersInput,
	'slug'
>

export enum CreateDateSelectOptions {
	TODAY = 'today',
	YESTERDAY = 'yesterday',
	LAST_7_DAYS = 'last-7',
	LAST_30_DAYS = 'last-30',
	CUSTOM = 'custom'
}
