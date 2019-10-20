import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxi from '../../../hoc/Auxi';

const sideDrawer = props =>
{
    let attachedClasses= [classes.SideDrawer, classes.Close].join(' ');
    if(props.open)
    {
        attachedClasses = [classes.SideDrawer, classes.Open].join(' ');
    }
    return (
        <Auxi>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxi>
    );
}

export default sideDrawer;