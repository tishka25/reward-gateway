import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import BackgroundColorDropDown from '../EmployeeColorPicker/EmployeeColorPicker';
import EditLabelModal from '../EditLabelModal/EditLabelModal';
import ExpandableAvatar from '../ExpandableAvatar/ExpandableAvatar';
import './style.css';
import { useSelector } from 'react-redux';
import { RootReducers } from '../../redux';

export interface EmployeeTableProps {
    pagination?: number;
}
function EmployeeTable(props: EmployeeTableProps) {
	const employeeListReducer = useSelector((s: RootReducers) => s.employeeListReducer);
	const [localEmployeeList, setLocalEmployeeList] = useState(employeeListReducer.employeeList);
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

	useEffect(()=>{
		if(employeeListReducer.searchQuery && employeeListReducer.searchQuery !== '') {
			setLocalEmployeeList(employeeListReducer.employeeList.filter((e) => {
				if(e.label && employeeListReducer.searchQuery && e.label.includes(employeeListReducer.searchQuery)) {
					return e;
				}
			}));
		} else {
			setLocalEmployeeList(employeeListReducer.employeeList);
		}
	}, [employeeListReducer.searchQuery]);

	function renderActions(uuid: string) {
		return (
			<Space>
				<BackgroundColorDropDown employeeUuid={uuid}/>
				<Button type="primary" onClick={()=>setOpenModalParams({ uuid })}>Edit Label</Button>
			</Space>

		);
	}

	function getData() {
		return localEmployeeList.map(e=>{
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
				// Update background color based on empoyee data.color prop
				onRow={(data) => {
					return {
						style: {
							backgroundColor: data.color,
						}
					};
				}}
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
