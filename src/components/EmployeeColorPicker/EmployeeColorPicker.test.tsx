import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../../redux';
import { setBackgroundColorForEmployee } from '../../redux/actions/employeeListAction';
import EmployeeColorPicker from './EmployeeColorPicker';


let hoverMenu:Element | null = null;
beforeEach(() => {
	const fakeData = [{
		'uuid': 'c2a5c9c4-4318-36c9-9bcf-fd8470b94e9c',
		'company': 'Abshire-Kohler',
		'bio': '<b>Ullam porro doloribus optio molestiae consequuntur explicabo. Et illo animi quo dolorem. Expedita qui sit molestias eum. Qui facere placeat quasi optio suscipit velit temporibus.</b>',
		'name': 'Ashly Funk',
		'label': 'asd',
		'title': 'Production Control Manager',
		'avatar': 'https://lorempixel.com/64/64/people/?84714'
	}];
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	jest.spyOn(global, 'fetch').mockImplementation(() => {
		return Promise.resolve({
			json: () => Promise.resolve(fakeData),
		});
	});
	act(()=>{
		render(<Provider store={store}><EmployeeColorPicker employeeUuid={fakeData[0].uuid}/></Provider>);
	});
	hoverMenu = document.querySelector('.ant-dropdown-link');
});


describe('<BackgroundColorDropDown />', () => {

	test('Should contain three different colors', async()=>{
		fireEvent.mouseOver(hoverMenu!);
		await waitFor(()=>{
			const defaultColors = {
				red: 'red',
				blue: 'blue',
				grey: 'grey',
			};
			// Test all colors
			Object.entries(defaultColors).map(([key,value]) => {
				const element = screen.getByTestId(key);
				const styles = getComputedStyle(element);
				expect(styles.backgroundColor).toBe(value);
			});
		});
	});

	test('Should prevent click', async () => {
		const event = { preventDefault: jest.fn };
		jest.spyOn(event, 'preventDefault');
		fireEvent.click(hoverMenu!);
		await waitFor(async ()=>{
			expect(event.preventDefault).not.toBeCalled();
		});
		// hoverMenu?.dispatchEvent();
	});


});
