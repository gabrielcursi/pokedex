import React, { ReactNode, useEffect, useState } from "react";
import PropTypes from 'prop-types';

type DelayedProps = {
	waitBeforeShow: number
	children: ReactNode
}

const Delayed = ({ waitBeforeShow, children }: DelayedProps) => {
	const [hidden, setHidden] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setHidden(false)
		}, waitBeforeShow)
	}, []);

	return hidden ? '' : children

};

export default Delayed;
