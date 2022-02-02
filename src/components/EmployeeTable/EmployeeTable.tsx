import { Table } from 'antd';
import React from 'react';
import { EmployeeEntity } from '../../service/rewardGatewayService';
import './style.css';

export interface EmployeeTableProps {
    employees: EmployeeEntity[],
}
function EmployeeTable(props: EmployeeTableProps) {
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
			key: 'bio'
		},
	];
	return <Table dataSource={props.employees} columns={defaultColumns} />;
}

export default EmployeeTable;
