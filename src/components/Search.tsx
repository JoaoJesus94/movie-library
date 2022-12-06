import { useQuery } from '@tanstack/react-query'
import { memo, KeyboardEvent, useLayoutEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { api } from '../lib/axios'
import { useKeyPress } from '../utils/useKeyPress'

function SearchBarComp() {
	const [searchModalOpen, setSearchModalOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const modalTriggerRef = useRef<HTMLInputElement>(null)
	const modalInputRef = useRef<HTMLInputElement>(null)

	const { data } = useQuery({
		queryKey: ['movies', 'search', searchTerm],
		queryFn: () => api.getSearchMovie(searchTerm),
		enabled: !!searchTerm,
	})

	useLayoutEffect(() => {
		if (searchModalOpen) {
			document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`
			document.body.style.overflowY = 'hidden'
		} else {
			document.body.style.paddingRight = '0px'
			document.body.style.overflowY = 'auto'
		}
	}, [searchModalOpen])

	function toggleModal() {
		modalTriggerRef.current?.click()
		setSearchModalOpen(prevValue => {
			setSearchTerm('')
			return !prevValue
		})
		if (!searchModalOpen) {
			setTimeout(() => {
				modalInputRef.current?.focus()
			}, 100)
		}
	}

	const onKeyPress = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'k') {
			event.preventDefault()
			toggleModal()
		}

		if (searchModalOpen && event.key === 'Escape') {
			event.preventDefault()
			toggleModal()
		}
	}

	useKeyPress(['Control', 'k', 'Escape'], onKeyPress)

	return (
		<>
			<div className="form-control">
				<label htmlFor="searchModal" className="input-group rounded-lg">
					<input onClick={toggleModal} type="text" placeholder="Search..." className="input focus:outline-none"></input>
					<span className="flex gap-2 bg-base-100">
						<kbd className="kbd kbd-sm">ctrl</kbd>
						<kbd className="kbd kbd-sm">k</kbd>
					</span>
				</label>
			</div>
			<div>
				<input ref={modalTriggerRef} type="checkbox" id="searchModal" className="modal-toggle" />
				<div className="modal">
					<div className="modal-box relative pt-10">
						<label htmlFor="searchModal" className="absolute right-2 top-2">
							<kbd className="kbd kbd-sm">ESC</kbd>
						</label>
						<div className="form-control">
							<label className="input-group">
								<input
									value={searchTerm}
									onChange={e => setSearchTerm(e.target.value)}
									ref={modalInputRef}
									type="text"
									placeholder="Search..."
									className="input input-bordered w-full"
								/>
								<span>
									<FaSearch size={20} />
								</span>
							</label>
						</div>
						{!!searchTerm && data?.results.length === 0 && (
							<div className="mt-4">
								No results for <strong>{searchTerm}</strong>.
							</div>
						)}
						{!!data?.results?.length && data?.results?.length > 0 && (
							<div className=" mt-4 flex flex-col gap-4 max-h-72 overflow-y-scroll">
								{data?.results.map(({ id, original_title, poster_path, overview }) => (
									<Link
										to={`/${id}`}
										key={id}
										className="flex gap-2 hover:bg-gray-700 rounded scroll"
										onClick={toggleModal}
									>
										<img
											className="rounded w-24"
											src={`https://image.tmdb.org/t/p/original${poster_path}`}
											alt={`${original_title} poster`}
										/>
										<div className="p-2 flex flex-col gap-4">
											<span>{original_title}</span>
											<span className="line-clamp-3">{overview}</span>
										</div>
									</Link>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export const SearchBar = memo(SearchBarComp)
