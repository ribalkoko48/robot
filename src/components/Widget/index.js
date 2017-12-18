import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PaperTabs from '../../components/PaperTabs'
import './style.scss'

class Widget extends Component {

    static propTypes = {
        tabs: PropTypes.array,
        style: PropTypes.object,
        selectedTab: PropTypes.string,
        onChangeTabs: PropTypes.func,
    }

    render() {
        const {children, tabs, selectedTab, onChangeTabs, style} = this.props

        return (
            <div className="widget" style={style}>
                {tabs ? <PaperTabs tabs={tabs}
                                   theme="inWidget"
                                   checked={selectedTab}
                                   onChange={onChangeTabs}
                /> : null}
                <div className="widget--content">
                    {children}
                </div>

            </div>
        )
    }
}

export default Widget