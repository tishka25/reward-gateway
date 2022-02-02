import React from 'react';
import './style.css';
import SearchField from '../SearchField/SearchField';

function PageHeader() {
	return (
		<div className='pageHeader'>
			<h2>Reward Gateway</h2>
			<SearchField placeholder='Search'/>
		</div>
	);
}

export default PageHeader;
