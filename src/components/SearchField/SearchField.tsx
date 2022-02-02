import React, { useState } from 'react';
import './style.css';
import icon from './icons8-search.svg';

export interface SearchFieldProps {
    width?: string | number;
    value?: string;
    placeholder: string;
    onChange?: (value: string) => void;
    onFinishEdit?: (value: string) => void;
}
function SearchField(props: SearchFieldProps) {
	const [currentValue, setCurrentValue] = useState(props.value || '');
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		props.onChange && props.onChange(value);
		setCurrentValue(value);
	}

	function handleSubmit() {
		props.onFinishEdit && props.onFinishEdit(currentValue);
	}

	return (
		<div className="search-container">
			<div className="search">
				<input type="text" className="searchTerm" placeholder={props.placeholder} onChange={handleChange}/>
				<button type="submit" className="searchButton" onClick={handleSubmit}>
					<img src={icon} />
				</button>
			</div>
		</div>
	);
}

export default SearchField;
