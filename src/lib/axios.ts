import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
		'Content-Type': 'application/json;charset=utf-8',
	},
})

export const api = {
	getDiscoverMovies: async ({ sort_by }: { sort_by: string }) => {
		const { data } = await instance.get<ResourceList<IMovieDetail>>(`discover/movie`, { params: { sort_by } })
		return data
	},
	getSearchMovie: async (query: string) => {
		const { data } = await instance.get<ResourceList<IMovieDetail>>('search/movie', { params: { query } })
		return data
	},
	getMovieDetail: async (movieId: string | undefined) => {
		if (!movieId) return

		const { data } = await instance.get<IMovieDetail>(`movie/${movieId}`)
		return data
	},
}
