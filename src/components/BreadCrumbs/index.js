import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'

class BreadCrumbs extends Component {

    static propTypes = {
        source: PropTypes.arrayOf(PropTypes.shape({
            route: PropTypes.string,
            label: PropTypes.string.isRequired,
        })).isRequired
    }

    render() {
        const {source} = this.props

        return (
            <h5 className="breadCrumbs">{
                source.map((r, i) => {
                    const {route, label} = r

                    return (
                        <span key={label} className="breadCrumbs--linkWrap">
                            {i > 0 ? <span className="breadCrumbs--arrow">></span> : null}
                            {route ?
                                <a className="breadCrumbs--link" href={'#' + route}>{label}</a>
                                : <span className="breadCrumbs--notLink">{label}</span>}
                        </span>
                    )
                })
            }</h5>
        )
    }

}

export default BreadCrumbs