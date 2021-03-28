import React, { useContext } from 'react';
import { MyContext } from '../../Store';

export default function ProductDetail() {
	const [state, setState] = useContext(MyContext);

	return <div>{JSON.stringify(state, null, 4)};</div>;
}
