import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const sideDrawer = (props) => {
	const sideDrawerClasses = [classes.SideDrawer];

	sideDrawerClasses.push(props.open ? classes.Open : classes.Close);

	return (
		<Auxiliary>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={sideDrawerClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Auxiliary>
	);
};

export default sideDrawer;