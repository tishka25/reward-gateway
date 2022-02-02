import { EmployeeEntity } from '../../service/rewardGatewayService';
import { EmployeeListActionType } from '../actions/employeeListAction';
import { Action } from '../types';

export interface Employee extends EmployeeEntity{
    label?: string;
}
export interface EmployeeListState {
    employeeList: Employee[];
}
const initialState: EmployeeListState = {
	employeeList: []
};

export default function (state = initialState, action: Action): EmployeeListState {
	const type = action.type;
	const payload = action.payload;

	switch (type) {
	case EmployeeListActionType.SET_EMPLOYEE_LIST:{
		return { ...state, employeeList: payload};
	}
	case EmployeeListActionType.SET_LABEL_FOR_EMPLOYEE:{
		const newEmployees = [...state.employeeList];
		newEmployees[payload.index].label = payload.label;
		return { ...state, employeeList: newEmployees };
	}
	default:
		return state;
	}
}
