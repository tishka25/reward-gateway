import { RootReducers } from '..';
import rewardGatewayService from '../../service/rewardGatewayService';
import persistStorage from '../../utils/persistStorage';
import { Employee } from '../reducers/employeeListReducer';
import { Dispacher } from '../types';

export enum EmployeeListActionType {
    GET_EMPLOYEE_LIST = 'GET_EMPLOYEE_LIST',
    SET_EMPLOYEE_LIST = 'SET_EMPLOYEE_LIST',
    SET_LABEL_FOR_EMPLOYEE = 'SET_LABEL_FOR_EMPLOYEE',
    SET_BACKGROUND_COLOR_FOR_EMPLOYEE = 'SET_BACKGROUND_COLOR_FOR_EMPLOYEE',
    SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
}

export const getEmployeeList = () => (dispatch: Dispacher) => {
	rewardGatewayService.getEmployeeList().then((employeeList) => {
		dispatch({ type: EmployeeListActionType.GET_EMPLOYEE_LIST, payload: persistStorage.getEmployeeConfiguration(employeeList) });
	});
};

export const setEmployeeList = (list: Employee[]) => (dispatch: Dispacher) => {
	return dispatch({ type: EmployeeListActionType.SET_EMPLOYEE_LIST, payload: list });
};

export const setLabelForEmployee = (index: number, label: string) => (dispatch: Dispacher, getState: () => RootReducers) => {
	dispatch({ type: EmployeeListActionType.SET_LABEL_FOR_EMPLOYEE, payload: { index, label } });
	persistStorage.saveEmployeeConfiguration(getState().employeeListReducer.employeeList);
};

export const setBackgroundColorForEmployee = (index: number, color: string) => (dispatch: Dispacher, getState: () => RootReducers) => {
	dispatch({ type: EmployeeListActionType.SET_BACKGROUND_COLOR_FOR_EMPLOYEE, payload: { index, color } });
	persistStorage.saveEmployeeConfiguration(getState().employeeListReducer.employeeList);
};

export const setSearchQuery = (query: string) => (dispatch: Dispacher) => {
	return dispatch({ type: EmployeeListActionType.SET_SEARCH_QUERY, payload: query });
};