import 'server-only'
import { cache } from 'react'
import { makeQueryClient } from '@/lib'

export const getQueryClient = cache(makeQueryClient)
