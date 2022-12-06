import { ChangeEvent, memo } from 'react'

interface SliderProps {
	id: string
	value: string | number
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	label: string
	min: number
	max: number
	step: number
	options: string[]
}

function SliderComp({ id, label, min, max, step, onChange, value, options }: SliderProps) {
	return (
		<div className="hidden lg:block w-full max-w-xs">
			<label htmlFor={id} className="label">
				<span className="label-text">{label}</span>
			</label>
			<input id={id} type="range" min={min} max={max} step={step} onChange={onChange} value={value} className="range" />
			<div className="w-full flex justify-between text-xs px-2">
				{options.map(option => (
					<span key={option}>{option}</span>
				))}
			</div>
		</div>
	)
}

export const Slider = memo(SliderComp)
