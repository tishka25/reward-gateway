import { Button, Skeleton, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import BackgroundColorDropDown from '../EmployeeColorPicker/EmployeeColorPicker';
import EditLabelModal from '../EditLabelModal/EditLabelModal';
import ExpandableAvatar from '../ExpandableAvatar/ExpandableAvatar';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducers } from '../../redux';
import { getEmployeeList } from '../../redux/actions/employeeListAction';

export interface EmployeeTableProps {
    pagination?: number;
}
function EmployeeTable(props: EmployeeTableProps) {
	const dispatch = useDispatch();
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
			key: 'company',
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
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
		dispatch(getEmployeeList());
	}, []);

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
	}, [employeeListReducer.searchQuery, employeeListReducer.employeeList]);

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

	function getTableSize() {
		const minWidth = 1280;
		return { x: minWidth, y: window.innerHeight * 0.7 };
	}

	function renderTableView() {
		return (
			<>
				<Table
					dataSource={getData()}
					pagination={getPagination()}
					columns={defaultColumns}
					scroll={getTableSize()}
					size="small"
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

	return (
		!employeeListReducer.employeeList.length ? <Skeleton active /> : renderTableView()
	);
}

export default EmployeeTable;
