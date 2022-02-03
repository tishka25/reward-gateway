import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../../redux';
import EmployeeTable from './EmployeeTable';

window.matchMedia = window.matchMedia || function() {
	return {
		matches: false,
		addListener: jest.fn,
		removeListener: jest.fn
	};
};

describe('<EmployeeTable />', () => {
	test('Should contain employee list', async ()=>{
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

		// Use the asynchronous version of act to apply resolved promises
		await act(async () => {
			render(<Provider store={store}><EmployeeTable /></Provider>);
		});
		expect(screen.getByText(fakeData[0].name)).toBeInTheDocument();
		expect(screen.getByText(fakeData[0].company)).toBeInTheDocument();
		// Strip html tags
		expect(screen.getByText(fakeData[0].bio.replace(/<\/?[^>]+(>|$)/g, ''))).toBeInTheDocument();
		expect(screen.getByText(fakeData[0].title)).toBeInTheDocument();
	});
});
