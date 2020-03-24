import React from 'react';
import { Route } from 'react-router-dom';
import LinkList from './Components/LinkList';

export default (
    <React.Fragment>​
        <Route exact path="/" component={LinkList} myname={"Lista linkow"}/>
    </React.Fragment>
);