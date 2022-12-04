import React from 'react';
import { render, fireEvent, queryByTestId } from '@testing-library/react';
import Carousel from './Carousel';

it('works when you click on the right arrow', function() {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();
});

// Smoke test
it('should render', function() {
	render(<Carousel />);
});

// Snapshot test
it('should match snapshot', function() {
	const { asFragment } = render(<Carousel />);
	expect(asFragment()).toMatchSnapshot();
});

// Part 3 Left arrow bug
it('should scroll to the left when left arrow is clicked', function() {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);
	const leftArrow = queryByTestId('left-arrow');
	fireEvent.click(leftArrow);

	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();
});

// Part 4 Hiding arrows at the ends
it('should hide arrows when at the end of the array', function() {
	const { queryByAltText, queryByTestId } = render(<Carousel />);
	if (queryByAltText('Photo by Richard Pasquarella on Unsplash')) {
		expect(queryByTestId('left-arrow')).not.toBeInTheDocument();
	}

	if (queryByAltText('Photo by Josh Post on Unsplash')) {
		expect(queryByTestId('right-arrow')).not.toBeInTheDocument();
	}
});
