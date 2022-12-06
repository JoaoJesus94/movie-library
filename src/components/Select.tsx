import { ChangeEvent, memo } from 'react'

interface OptionType {
	label: string
	value: string | number
}

interface SelectProps {
	id: string
	value: string | number
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void
	label: string
	options: OptionType[]
}

function SelectComp({ id, label, options, onChange, value }: SelectProps) {
	return (
		<div className="form-control w-full max-w-xs">
			<label htmlFor={id} className="label">
				<span className="label-text">{label}</span>
			</label>
			<select id={id} className="select select-bordered" onChange={onChange} value={value}>
				{options.map(option => (
					<option key={option.label} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}

export const Select = memo(SelectComp)
