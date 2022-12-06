import { ChangeEvent, useCallback, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'
import { Select } from '../components/Select'
import { Slider } from '../components/Slider'
import { MovieCard } from '../components/MovieCard'

const RANGE_TO_CLASS: MapperType<string, string> = {
	1: 'lg:grid-cols-8',
	2: 'lg:grid-cols-7',
	3: 'lg:grid-cols-6',
	4: 'lg:grid-cols-5',
	5: 'lg:grid-cols-4',
}

const sliderOptions = ['XS', 'S', 'M', 'L', 'XL']

const selectOptions = [
	{ label: 'Popularity Descending', value: 'popularity.desc' },
	{ label: 'Popularity Ascending', value: 'popularity.asc' },
	{ label: 'Title (A-Z)', value: 'title.asc' },
	{ label: 'Title (Z-A)', value: 'title.desc' },
]

export function Home() {
	const { preferredSorting, preferredCardSize } = useLoaderData() as RootLoaderReturnType
	const [selectedSorting, setSelectedSorting] = useState(preferredSorting)
	const [selectedCardSize, setSelectedCardSize] = useState(preferredCardSize)

	const { data } = useQuery({
		queryKey: ['movies', selectedSorting],
		queryFn: () => api.getDiscoverMovies({ sort_by: selectedSorting }),
	})

	const handleOnSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		localStorage.setItem('preferred-sorting', e.target.value)
		setSelectedSorting(e.target.value)
	}, [])

	const handleOnSliderChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		localStorage.setItem('preferred-card-size', e.target.value)
		setSelectedCardSize(e.target.value)
	}, [])

	return (
		<>
			<div className="flex justify-around mb-10">
				<Select
					id="sortBy"
					value={selectedSorting}
					onChange={handleOnSelectChange}
					label="Sort results by"
					options={selectOptions}
				/>

				<Slider
					id="cardSize"
					value={selectedCardSize}
					min={1}
					max={5}
					step={1}
					onChange={handleOnSliderChange}
					label="Adjust card size"
					options={sliderOptions}
				/>
			</div>

			<div
				className={`grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] justify-center gap-4 ${RANGE_TO_CLASS[selectedCardSize]}`}
			>
				{data?.results.map(item => (
					<Link to={`/${item.id}`} key={item.id}>
						<MovieCard original_title={item.original_title} poster_path={item.poster_path} />
					</Link>
				))}
			</div>
		</>
	)
}
