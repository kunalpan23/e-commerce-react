import React, { useState, createContext } from 'react';
import { INITIAL_STATE } from '../Constants';

const MyContext = createContext([{}, () => {}]);

const MyProvider = ({ children }) => {
	const [state, setState] = useState(INITIAL_STATE);

	return (
		<MyContext.Provider value={[state, setState]}>
			{children}
		</MyContext.Provider>
	);
};

export { MyContext, MyProvider };
