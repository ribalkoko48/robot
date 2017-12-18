import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

class Link extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        to: function (props, propName) {
            if (props[propName] !== undefined && typeof props[propName] !== 'string') {
                return new Error("Invalid prop `to` of type `" + typeof props[propName] + "` supplied to `Link`, expected `string`.");
            }
            if(props.to && props.href){
                  return new Error(
                    'В компоненте `Link` должен быть только один props.to или props.href '
                );
            }
        },
        href: PropTypes.string,
        newWindow: PropTypes.bool,
        underline: PropTypes.bool,
        active: PropTypes.bool,
        disable: PropTypes.bool
    }

    static defaultProps = {
        newWindow: false,
        underline: false,
        active: false,
        disable: false,
        to: ''
    }

    _onClick = (e) => {
        const {disable, onClick, to, href} = this.props

        if (disable || to && href) {
            if(to && href) console.error('выбери: to или href')
            e.preventDefault()
        } else {
            onClick && onClick(e)
        }
    }

    render() {
        const {type, className, newWindow, href, disable, underline, active, to} = this.props;
        const targetStr = newWindow ? '_blank' : '_self'

        const clName = classnames('', className, {
            link__primary: type === 'primary',
            link__primaryBold: type === 'primary-bold',
            'link__underline': underline,
            'link__active': active,
            'link__disable': disable
        });


        return (
            <a className={clName} href={href ? href : '#' + to } target={targetStr} onClick={this._onClick}>
                {this.props.children}
            </a>
        )
    }

}

export default Link
