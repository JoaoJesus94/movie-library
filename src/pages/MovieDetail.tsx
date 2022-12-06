import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { api } from '../lib/axios'
import { abbreviateNumber } from '../utils/abbreviateNumber'

export function MovieDetail() {
	const { movieId } = useParams()

	const { data } = useQuery({
		queryKey: ['movies', movieId],
		queryFn: () => api.getMovieDetail(movieId),
		enabled: !!movieId,
	})

	return (
		<div className="flex flex-col gap-6 max-w-2xl m-auto">
			{!!data?.backdrop_path && (
				<img
					src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
					alt={`${data?.original_title} backdrop`}
					className="rounded"
				/>
			)}
			<h1 className="text-3xl text-center font-bold">{data?.original_title}</h1>
			<span className="text-justify italic">{data?.overview}</span>

			<div className="stats shadow">
				<div className="stat">
					<div className="stat-title">Release Date</div>
					<div className="stat-value text-primary">
						{new Intl.DateTimeFormat(undefined, {
							year: 'numeric',
							month: 'short',
						}).format(new Date(data?.release_date))}
					</div>
				</div>

				<div className="stat">
					<div className="stat-title">Revenue</div>
					<div className="stat-value text-secondary">{abbreviateNumber(Number(data?.revenue))} $</div>
				</div>

				<div className="stat">
					<div className="stat-title">Rating</div>
					<div className="stat-value">{data?.vote_average}</div>
					<div className="stat-desc text-secondary">{data?.vote_count} total votes</div>
				</div>
			</div>
		</div>
	)
}
