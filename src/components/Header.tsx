import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { SearchBar } from './Search'

export function Header() {
	return (
		<header className="sticky top-0 z-50">
			<div className="layout-rules navbar flex-col gap-6 sm:flex-row shadow-xl py-4">
				<div className="flex-1">
					<Link to="/">
						<Logo width={150} />
					</Link>
				</div>
				<div className="flex-none gap-2">
					<SearchBar />
				</div>
			</div>
		</header>
	)
}
