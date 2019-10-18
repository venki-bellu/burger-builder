import React from 'react';
import Auxi from '../../hoc/Auxi';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
    <Auxi>
        <Toolbar />
        <SideDrawer />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxi>
);

export default layout;