import { Dropdown, Menu } from 'antd';
import React from 'react';

function BackgroundColorDropDown() {
	const defaultColors = {
		red: 'red',
		blue: 'blue',
		grey: 'grey'
	};
	function handleColorSelect(colorType: string & 'custom') {
		if(colorType === 'custom'){
			return;
		}
		console.log('Clicked: ', colorType);
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
