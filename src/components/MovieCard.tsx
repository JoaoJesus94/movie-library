import { memo } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CardProps extends Pick<IMovieDetail, 'poster_path' | 'original_title'> {}

function MovieCardComp({ poster_path, original_title }: CardProps) {
	if (poster_path)
		return (
			<img
				className="rounded-2xl hover:opacity-60"
				src={poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : ''}
				alt={`${original_title} poster`}
			/>
		)

	return <div className="hover:bg-gray-700 w-full h-full rounded-2xl p-4">{original_title}</div>
}

export const MovieCard = memo(MovieCardComp)
