import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Router, Route, IndexRoute, Redirect, IndexRedirect} from 'react-router'
import {PROFILE_ROUTE, PROFILE_COMMON_SUBROUTE, PROFILE_PASSWORD_SUBROUTE} from '../constants.js'
import AppContainer from '../containers/AppContainer'
import ProfileSection from '../containers/ProfileSection'
import Common from '../containers/ProfileSection/Common'
import Password from '../containers/ProfileSection/Password'
import '../../public/style/global-config.scss'


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
                        <Route path={PROFILE_PASSWORD_SUBROUTE} component={Password}/>
                    </Route>
                </Route>
            </Router>
        );
    }
}
