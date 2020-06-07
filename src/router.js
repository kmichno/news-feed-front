import React from 'react';
import { Route } from 'react-router-dom';
import LinkList from './Components/LinkList';
import EditLink from './Components/EditLink';

export default (
    <React.Fragment>​
        <Route exact path="/" component={LinkList} myname={"Lista linkow"}/>
        <Route path="/link/edit/:idLink" component={EditLink} name = "Edytuj link" />
    </React.Fragment>
);