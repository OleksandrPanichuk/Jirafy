import { FindAllProjectsWithFiltersInput } from "@/api"
import { OmitTyped } from "@/types"


export type ProjectFilters = OmitTyped<FindAllProjectsWithFiltersInput,	'slug'>