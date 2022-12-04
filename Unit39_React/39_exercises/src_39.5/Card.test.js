import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';

// Smoke test
it('should render properly', () => {
	render(<Card />);
});

// Snapshot test
it('should match the snapshot', () => {
	const { asFragment } = render(<Card />);
	expect(asFragment).toMatchSnapshot();
});
