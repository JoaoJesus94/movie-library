import { Link } from 'react-router-dom'

export function Error() {
	return (
		<div className="h-full flex flex-col justify-center items-center">
			<h1 className="text-8xl">Oops!</h1>
			<h2 className="pt-8 text-4xl">Something wrong is not right</h2>
			<Link to="/" className="link link-accent link-hover pt-4 text-lg">
				Back to list!
			</Link>
		</div>
	)
}
