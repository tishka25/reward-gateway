import { Employee } from './redux/reducers/employeeListReducer';

export function findEmployeeById(employeeList: Employee[], uuid?: string) {
	if(!uuid) {
		return -1;
	}
	return employeeList.findIndex((e) => e.uuid === uuid);
}