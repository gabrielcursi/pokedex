import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const Delayed = ({ waitBeforeShow, children }) => {
	const [hidden, setHidden] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setHidden(false)
		})
	}, [waitBeforeShow]);

	if(hidden){
		return ''
	}else{
		return(
			children
		)
	}

	// return (
	// 	hidden ? '' : children
	// )
};

export default Delayed;
