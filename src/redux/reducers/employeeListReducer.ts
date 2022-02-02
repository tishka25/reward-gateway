import { EmployeeListActionType } from '../actions/employeeListAction';
import { Action } from '../types';

export interface EmployeeListState {
    employeeList: any[];
}
const initialState: EmployeeListState = {
	employeeList: []
};

export default function (state = initialState, action: Action): EmployeeListState {
	const type = action.type;
	const payload = action.payload;

	switch (type) {
	case EmployeeListActionType.SET_EMPLOYEE_LIST:
		return { ...state, employeeList: payload};
	default:
		return state;
	}
}
