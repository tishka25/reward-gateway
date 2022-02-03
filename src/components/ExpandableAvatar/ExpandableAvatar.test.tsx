import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import ExpandableAvatar from './ExpandableAvatar';

describe('<ExpandableAvatar />', () => {
	const defaultImageUri = 'https://picsum.photos/id/237/200/300';
	const onExpandChange = jest.fn();
	const wrapper = render(<ExpandableAvatar uri={defaultImageUri} onExpandChange={onExpandChange} />);

	const imageToggle = document.querySelector('[data-testid=image-toggle]');
	test('Image should expand when clicked', ()=>{
		act(()=>{
			imageToggle?.dispatchEvent(new MouseEvent('click'));
		});
		waitFor(()=>{
			expect(onExpandChange).toHaveBeenCalledTimes(1);
			expect(imageToggle?.classList).toContain('expandableAvatarContainer-expanded');
		});
	});

	test('Should have className', ()=>{
		const classList = imageToggle?.classList;
		expect(classList).toContain('expandableAvatarContainer');
	});

	test('Should contain image', ()=>{
		const result = imageToggle?.querySelector('img');
		expect(result).toHaveAttribute('src', defaultImageUri);
	});
});
