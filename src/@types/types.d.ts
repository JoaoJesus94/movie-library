type MapperType<K extends string | number, P> = {
	[Property in K]: P
}

interface RootLoaderReturnType {
	preferredSorting: string
	preferredCardSize: string
}

interface IMovieDetail {
	backdrop_path: string
	id: number
	original_title: string
	overview: string | null
	poster_path: string | null
	release_date: string
	revenue: number
	vote_average: number
	vote_count: number
}

interface ResourceList<T> {
	results: T[]
}
