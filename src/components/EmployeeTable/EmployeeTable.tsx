import { Table } from 'antd';
import React from 'react';
import { EmployeeEntity } from '../../service/rewardGatewayService';
import './style.css';

export interface EmployeeTableProps {
    employees: EmployeeEntity[],
    pagination?: number;
}
function EmployeeTable(props: EmployeeTableProps) {
	const defaultPagination = 20;
	const defaultColumns = [
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
	];

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
		return window.innerHeight * 0.8;
	}
	return <Table dataSource={getData()} pagination={getPagination()} columns={defaultColumns} scroll={{ y: getTableHeight() }}/>;
}

export default EmployeeTable;
