import React, { useEffect } from 'react';
import './App.css';
import rewardGatewayService from './service/rewardGatewayService';

function App() {
	useEffect(() => {
		(async ()=>{
			console.log(await rewardGatewayService.getEmployeeList());
		})();
	}, []);
  
	return (
		<div className="App">
		</div>
	);
}

export default App;
