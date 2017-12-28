
import React from 'react'
import {render} from 'react-dom'
import {hashHistory} from 'react-router'
import AppRoter from './router'

function RUN_APP(store) {
    render(<AppRoter store={store} history={hashHistory} />, document.getElementById('application_root'))
}
RUN_APP();



