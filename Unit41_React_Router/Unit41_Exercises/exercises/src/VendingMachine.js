import React from 'react';
import Soda from './Soda';
import Chips from './Chips';
import Fish from './Fish';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function VendingMachine() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/soda" element={<Soda />} />
					<Route exact path="/chips" element={<Chips />} />
					<Route exact path="/fish" element={<Fish />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default VendingMachine;
