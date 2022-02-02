import { Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import PageHeader from './components/PageHeader/PageHeader';
import { RootReducers } from './redux';
import { setEmployeeList } from './redux/actions/employeeListAction';
import rewardGatewayService from './service/rewardGatewayService';

function App() {
	const dispatch = useDispatch();
	const employeeList = useSelector((s: RootReducers) => s.employeeListReducer.employeeList);

	useEffect(() => {
		(async ()=>{
			const employees = await rewardGatewayService.getEmployeeList();
			dispatch(setEmployeeList(employees));
		})();
	}, []);
  
	return (
		<div className="App">
			<PageHeader />
			{employeeList.length ? <EmployeeTable /> : <Skeleton active />}
		</div>
	);
}

export default App;
