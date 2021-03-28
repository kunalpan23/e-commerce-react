import React, { useContext } from 'react';
import { MyContext } from '../../Store';

export default function Bag() {
	const [state, useState] = useContext(MyContext);

	return <div>This is bag;</div>;
}
