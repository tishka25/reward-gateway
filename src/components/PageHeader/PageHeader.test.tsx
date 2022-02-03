import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';
import { Provider } from 'react-redux';
import store from '../../redux';

describe('<PageHeader />', () => {
	const defaultProps = {};
	const wrapper = render(<Provider store={store}><PageHeader {...defaultProps} /></Provider>);

	test('renders title', () => {
		const title = screen.getByText(/Reward Gateway/);
		expect(title).toBeInTheDocument();
	});
	test('render as snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

});
