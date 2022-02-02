import { Button, Dropdown, Input, Menu, Space, Table } from 'antd';
import React, { useState } from 'react';
import { Employee } from '../../redux/reducers/employeeListReducer';
import BackgroundColorDropDown from '../EmployeeColorPicker/EmployeeColorPicker';
import EditLabelModal from '../EditLabelModal/EditLabelModal';
import ExpandableAvatar from '../ExpandableAvatar/ExpandableAvatar';
import './style.css';

export interface EmployeeTableProps {
    employees: Employee[],
    pagination?: number;
}
function EmployeeTable(props: EmployeeTableProps) {
	const [openModalParams, setOpenModalParams] = useState<{ uuid: string } | undefined>(undefined);
	const defaultPagination = 20;
	const defaultColumns = [
		{
			title: 'Avatar',
			dataIndex: 'avatar',
			key: 'avatar',
			render: (uri: string) => <ExpandableAvatar uri={uri} />
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Company',
			dataIndex: 'company',
			key: 'company'
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title'
		},
		{
			title: 'Bio',
			dataIndex: 'bio',
			key: 'bio',
			render: (bio: string) => <span dangerouslySetInnerHTML={{__html: bio}} />
		},
		{
			title: 'Action',
			dataIndex: 'uuid',
			key: 'action',
			render: renderActions
		}
	];

	function renderActions(uuid: string) {
		return (
			<Space>
				<BackgroundColorDropDown />
				<Button type="primary" onClick={()=>setOpenModalParams({ uuid })}>Edit Label</Button>
			</Space>

		);
	}

	function getData() {
		return props.employees.map(e=>{
			return {
				...e,
				key: e.uuid,
			};
		});
	}

	function getPagination() {
		return {
			pageSize: props.pagination || defaultPagination
		};
	}

	function getTableHeight() {
		return window.innerHeight * 0.7;
	}
	return (
		<>
			<Table 
				dataSource={getData()} 
				pagination={getPagination()}
				columns={defaultColumns}
				scroll={{ y: getTableHeight() }}
				expandable={{
					expandedRowRender: record => <p style={{ margin: 0 }}>Label: {record.label}</p>,
					rowExpandable: record => record.label !== undefined,
				}} 
			/>
			<EditLabelModal visible={!!openModalParams} employeeUuid={openModalParams?.uuid} onFinish={() => setOpenModalParams(undefined)}/>
		</>
	);
}

export default EmployeeTable;
