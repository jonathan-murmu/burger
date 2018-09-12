import React from 'react';
import classes from './DrawerTogger.css';

const drawerToggel = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggel;