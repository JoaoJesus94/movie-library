import { QueryClient } from '@tanstack/react-query'
import { createBrowserRouter } from 'react-router-dom'

import { Layout } from './pages/Layout'
import { Home } from './pages/Home'
import { MovieDetail } from './pages/MovieDetail'

import { loader as homeLoader } from './routes/home'
import { loader as movieDetailLoader } from './routes/movieDetail'
import { Error } from './components/Error'

export const router = (queryClient: QueryClient) =>
	createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					index: true,
					loader: homeLoader(queryClient),
					element: <Home />,
					errorElement: <Error />,
				},
				{
					path: '/:movieId',
					loader: movieDetailLoader(queryClient),
					element: <MovieDetail />,
					errorElement: <Error />,
				},
			],
		},
	])
