import React from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import PageHeader from './components/PageHeader/PageHeader';

function App () {

	return (
		<div className="App">
			<PageHeader />
			<EmployeeTable />
		</div>
	);
}

export default App;
