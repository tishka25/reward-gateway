import { EmployeeEntity } from '../../service/rewardGatewayService';
import { Dispacher } from '../types';

export enum EmployeeListActionType {
    SET_EMPLOYEE_LIST = 'SET_EMPLOYEE_LIST',
}

export const setEmployeeList = (list: EmployeeEntity[]) => (dispatch: Dispacher) => {
	return dispatch({ type: EmployeeListActionType.SET_EMPLOYEE_LIST, payload: list });
};
