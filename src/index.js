import React from 'react';
import ReactDOM from 'react-dom';
import ProfileSection from '../src/containers/ProfileSection'
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
    <Router>
        <ProfileSection />
    </Router>,
    document.getElementById('application_root')
);

// RUN_APP();

// module.hot.accept();




