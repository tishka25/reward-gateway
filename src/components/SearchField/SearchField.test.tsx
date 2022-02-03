import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import SearchField from './SearchField';


describe('<SearchField />', () => {
	test('Should render placeholder text', ()=>{
		const placeholder = 'Search';
		render(<SearchField placeholder={placeholder} />);
		const inputPlaceholder = document.querySelector('input')?.getAttribute('placeholder');
		expect(inputPlaceholder).toBe(placeholder);
	});

	test('Should change search query', async () => {
		render(<SearchField />);
		const inputElement = document.querySelector('input');
		const testValue = 'TestValueForInputElement';
		// fireEvent.change(inputElement!, { target: { value: testValue } });
		userEvent.type(inputElement!, testValue);
		await waitFor(()=>{
			expect(inputElement).toHaveValue(testValue);
		});
	});

	test('Should finish on submit', async ()=>{
		const onFinishEdit = jest.fn();
		render(<SearchField onFinishEdit={onFinishEdit}/>);
		const button = document.querySelector('.searchButton');
		userEvent.click(button!);
		await waitFor(()=>{
			expect(onFinishEdit).toBeCalled();
		});
	});
});
