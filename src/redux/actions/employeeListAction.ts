import { Employee } from '../reducers/employeeListReducer';
import { Dispacher } from '../types';

export enum EmployeeListActionType {
    SET_EMPLOYEE_LIST = 'SET_EMPLOYEE_LIST',
    SET_LABEL_FOR_EMPLOYEE = 'SET_LABEL_FOR_EMPLOYEE',
}

export const setEmployeeList = (list: Employee[]) => (dispatch: Dispacher) => {
	return dispatch({ type: EmployeeListActionType.SET_EMPLOYEE_LIST, payload: list });
};

export const setLabelForEmployee = (index: number, label: string) => (dispatch: Dispacher) => {
	return dispatch({ type: EmployeeListActionType.SET_EMPLOYEE_LIST, payload: { index, label } });
};
