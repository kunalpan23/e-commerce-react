import React, { useState, createContext } from 'react';
import defaultStore from '../data/defaultStore';

const MyContext = createContext([{}, () => {}]);

const MyProvider = ({ children }) => {
	const [state, setState] = useState(defaultStore);

	return (
		<MyContext.Provider value={[state, setState]}>
			{children}
		</MyContext.Provider>
	);
};

export { MyContext, MyProvider };
