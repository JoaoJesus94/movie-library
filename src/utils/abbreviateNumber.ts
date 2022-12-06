export function abbreviateNumber(value: number) {
	let newValue = value
	const suffixes = ['', 'K', 'M', 'B', 'T']
	let suffixNum = 0
	while (newValue >= 1000) {
		newValue /= 1000
		suffixNum++
	}

	newValue = Number(newValue.toPrecision(3))

	return `${newValue}${suffixes[suffixNum]}`
}
