import { Input, Modal } from 'antd';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducers } from '../../redux';
import { setLabelForEmployee } from '../../redux/actions/employeeListAction';
import { findEmployeeById } from '../../utils';
import './style.css';

export interface EditLabelModalProps {
    employeeUuid?: string;
    visible?: boolean;
    onFinish?: () => void;
}
function EditLabelModal(props: EditLabelModalProps) {
	const employeeList = useSelector((s: RootReducers) => s.employeeListReducer.employeeList);
	const currentEmployeeIndex = useMemo(()=>findEmployeeById(employeeList, props.employeeUuid), [props.employeeUuid]);
	const [newLabel, setNewLabel] = useState(getCurrentLabel());
	const dispatch = useDispatch();

	function getCurrentLabel() {
		if(currentEmployeeIndex === -1) {
			return undefined;
		}
		return employeeList[currentEmployeeIndex].label;
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewLabel(e.target.value);
	}

	function handleSubmit() {
		if(currentEmployeeIndex !== -1 && newLabel) {
			dispatch(setLabelForEmployee(currentEmployeeIndex, newLabel));
		}
		props.onFinish && props.onFinish();
	}
	return (
		<Modal title="Edit Label" visible={props.visible} onOk={handleSubmit} onCancel={props.onFinish}>
			<div className="editLabelModal">
				<Input style={{ width: 'calc(100% - 200px)' }} placeholder="Label" onChange={handleChange} defaultValue={getCurrentLabel()}/>
			</div>
		</Modal>
	);
}

export default EditLabelModal;
