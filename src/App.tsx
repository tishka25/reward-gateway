import { Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import PageHeader from './components/PageHeader/PageHeader';
import { RootReducers } from './redux';
import { setEmployeeList } from './redux/actions/employeeListAction';
import rewardGatewayService from './service/rewardGatewayService';

function App () {

	return (
		<div className="App">
			<PageHeader />
			<EmployeeTable />
		</div>
	);
}

export default App;
