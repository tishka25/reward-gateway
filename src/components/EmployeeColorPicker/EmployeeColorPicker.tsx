import React, { useMemo } from 'react';
import { Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducers } from '../../redux';
import { setBackgroundColorForEmployee } from '../../redux/actions/employeeListAction';

export interface BackgroundColorDropDownProps {
    employeeUuid?: string;
}
function BackgroundColorDropDown(props: BackgroundColorDropDownProps) {
	const employeeList = useSelector((s: RootReducers) => s.employeeListReducer.employeeList);
	const currentEmployeeIndex = useMemo(()=>findCurrentEmployee(), [props.employeeUuid]);
	const dispatch = useDispatch();

	function findCurrentEmployee(){
		return employeeList.findIndex((e) => e.uuid === props.employeeUuid);
	}
	const defaultColors = {
		red: 'red',
		blue: 'blue',
		grey: 'grey'
	};
	function handleColorSelect(colorType: string & 'custom') {
		if(colorType === 'custom' || currentEmployeeIndex === -1){
			return;
		}
		dispatch(setBackgroundColorForEmployee(currentEmployeeIndex, colorType));
	}

	function renderColorListItem(name: string, color: string) {
		return <Menu.Item key={name} style={{ backgroundColor: color, height: 20 }} />;
	}

	function renderDropdownMenu () {
		return (	
			<Menu onClick={({ key }) => handleColorSelect(key as any)} style={{ width: 'calc(100% + 40px)' }}>
				{Object.entries(defaultColors).map(([key,value]) => renderColorListItem(key, value))}
				<Menu.Item key="custom">Custom</Menu.Item>
			</Menu>
		);
	}
	return (
		<Dropdown overlay={renderDropdownMenu}>
			<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Color
			</a>
		</Dropdown>
	);
}

export default BackgroundColorDropDown;
