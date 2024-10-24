import { useMedia } from 'react-use'

export function usePrefersReducedMotion() {
  return useMedia('(prefers-reduced-motion: reduce)')
}