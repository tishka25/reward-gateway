import { Employee } from '../../redux/reducers/employeeListReducer';

export interface EmployeeConfigurationEntity {
    label?: string;
    color?: string;
}
export type EmployeeConfiguration = {
    [key: string]: EmployeeConfigurationEntity;
}
enum PersistStorageKey {
    EMPLOYEE_CONFIGURATION = 'EMPLOYEE_CONFIGURATION',
}
/**
 * Helper class to help with persistent storage for labels and background color for the employee list
 * Maps the options (label and backgroundColor) to specific UUID on the employee list
 */
class PersistStorage {
	private get(key: PersistStorageKey, json = true) {
		try {
			const result = localStorage.getItem(key);
			if(result === null) {
				return null;
			}
			return json ? JSON.parse(result) : result;
		} catch (error) {
			return null;
		}
	}
	private set(key: PersistStorageKey, value: string) {
		try {
			localStorage.setItem(key, value);
			return true;
		} catch (error) {
			return false;
		}
	}
	saveEmployeeConfiguration(employeeList: Employee[]) {
		const configuration: EmployeeConfiguration = {};
		employeeList.forEach(e=>{
			const { label, color } = e;
			if(label || color) {
				configuration[e.uuid] = { label, color };
			}
		});
		this.set(PersistStorageKey.EMPLOYEE_CONFIGURATION, JSON.stringify(configuration));
	}

	/**
     * Pass employee list and this function will inject all the prevously saved information
     * @param employeeList
     */
	getEmployeeConfiguration(employeeList: Employee[]): Employee[] {
		const configuration = this.get(PersistStorageKey.EMPLOYEE_CONFIGURATION, true);
		const newEmployeeList = [ ...employeeList ];
		for(const [uuid, value] of Object.entries(configuration)) {
			const currentEmployeeIndex = newEmployeeList.findIndex((e) => e.uuid === uuid);
			if(currentEmployeeIndex !== -1) {
				newEmployeeList[0] = { ...newEmployeeList[currentEmployeeIndex], ...value as EmployeeConfigurationEntity };
			}
		}
		employeeList = [...newEmployeeList ];
		return employeeList;
	}
}

export default new PersistStorage();