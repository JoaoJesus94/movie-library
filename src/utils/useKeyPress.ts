import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

export const useKeyPress = (keys: string[], callback: (e: KeyboardEvent) => void): void => {
	const callbackRef = useRef(callback)

	useLayoutEffect(() => {
		callbackRef.current = callback
	})

	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			if (keys.some(key => event.key === key)) {
				callbackRef.current(event)
			}
		},
		[keys],
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress)

		return () => {
			document.removeEventListener('keydown', handleKeyPress)
		}
	}, [handleKeyPress])
}
