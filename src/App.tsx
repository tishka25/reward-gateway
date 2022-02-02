import React, { useEffect, useState } from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import rewardGatewayService, { EmployeeEntity } from './service/rewardGatewayService';

function App() {
	const [employees, setEmployees] = useState<EmployeeEntity[]>([]);
	useEffect(() => {
		(async ()=>{
			setEmployees(await rewardGatewayService.getEmployeeList());
		})();
	}, []);
  
	return (
		<div className="App">
			<EmployeeTable employees={employees}/>
		</div>
	);
}

export default App;
