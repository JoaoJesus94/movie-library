import { QueryClient } from '@tanstack/react-query'
import { api } from '../lib/axios'

export const loader =
	(queryClient: QueryClient) =>
	async ({ params }) => {
		try {
			await queryClient.prefetchQuery({
				queryKey: ['movies', params.movieId],
				queryFn: () => api.getMovieDetail(params.movieId),
			})
			return params
		} catch (error) {
			throw new Response('Bad Request', { status: 400 })
		}
	}
