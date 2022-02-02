import React from 'react';
import './style.css';
import SearchField from '../SearchField/SearchField';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/actions/employeeListAction';

function PageHeader() {
	const dispatch = useDispatch();
	function handleSearchQuery(value: string) {
		dispatch(setSearchQuery(value));
	}
	return (
		<div className='pageHeader'>
			<h2>Reward Gateway</h2>
			<SearchField placeholder='Search' onFinishEdit={handleSearchQuery} onChange={handleSearchQuery}/>
		</div>
	);
}

export default PageHeader;
