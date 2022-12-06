import { QueryClient } from '@tanstack/react-query'
import { api } from '../lib/axios'

export const loader = (queryClient: QueryClient) => async () => {
	const preferredSorting = localStorage.getItem('preferred-sorting') || 'popularity.desc'
	const preferredCardSize = localStorage.getItem('preferred-card-size') || '2'

	await queryClient.prefetchQuery({
		queryKey: ['movies', preferredSorting],
		queryFn: () => api.getDiscoverMovies({ sort_by: preferredSorting }),
	})
	return { preferredSorting, preferredCardSize }
}
