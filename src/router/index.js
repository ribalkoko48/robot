import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Router, Route, IndexRoute, Redirect, IndexRedirect} from 'react-router'
import {PROFILE_ROUTE, PROFILE_COMMON_SUBROUTE, PROFILE_PHOTOS_SUBROUTE} from '../constants.js'
import AppContainer from '../containers/AppContainer/index.js'
import ProfileSection from '../containers/ProfileSection/index.js'
import Common from '../containers/ProfileSection/Common/index.js'
import Photos from '../containers/ProfileSection/Photos/index.js'


export default class AppRouter extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired
    };


    render() {
        const {history} = this.props;

        return (
            <Router history={ history }>
                <Route  path="/" component={AppContainer}>
                    <IndexRedirect to={PROFILE_ROUTE} />
                    <Route path={PROFILE_ROUTE} component={ProfileSection}>
                        <IndexRedirect to={PROFILE_COMMON_SUBROUTE} />
                        <Route path={PROFILE_COMMON_SUBROUTE} component={Common}/>
                        <Route path={PROFILE_PHOTOS_SUBROUTE} component={Photos}/>
                    </Route>
                </Route>
            </Router>
        );
    }
}
