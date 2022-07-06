import { useState } from 'react';
import uuid from 'uuid';
import axios from 'axios';

const useFlip = () => {
	const [ isUp, setIsUp ] = useState(true);
	const flipCard = () => setIsUp((isUp) => !isUp);
	return [ isUp, flipCard ];
};

const useAxios = () => {
	const [ axiosRes, setAxiosRes ] = useState([]);
	const axiosCall = async (url) => {
		const response = await axios.get(url);
		setAxiosRes((axiosRes) => [ ...axiosRes, { ...response.data, id: uuid() } ]);
	};
	return [ axiosRes, axiosCall ];
};

export { useFlip, useAxios };
