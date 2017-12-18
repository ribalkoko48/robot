import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Overlay} from '../../../src/components/Overlay'
import classnames from 'classnames'
import Portal from '../../../src/components/Portal'
import activavledRenderer from '../../../src/components/activabledRenderer'
import './style.scss'

class Popup extends Component {

    state = {
        isBiggerThanWindow: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.checkVerticalSize()
        }, 0)
    }

    componentWillReceiveProps(next) {
        if (next.active && !this.props.active) {
            this.checkVerticalSize()
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.checkVerticalSize)
        document.addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkVerticalSize)
        document.removeEventListener('keydown', this.onKeyDown)
    }

    stopProp = (e) => {
        e.stopPropagation()
    }

    checkVerticalSize = () => {
        const popup = this.refs.popup

        if (popup) {
            if (popup.offsetHeight + 30 > document.documentElement.offsetHeight || popup.offsetWidth + 30 > document.documentElement.offsetWidth) {
                this.setState({isBiggerThanWindow: true})
            } else {
                this.setState({isBiggerThanWindow: false})
            }
        }
    };

    onKeyDown = (e) => {
        const key = e.keyCode

        if (key === 27 && !this.props.disableOnClose) {
            this.props.onClose && this.props.onClose()
        }
    };

    render() {
        const {type, active, onClose, disableOnClose, higher, className, responsive, bddmark} = this.props
        const {isBiggerThanWindow} = this.state

        const _className = classnames('popup', className, {
            popup__active: active,
            popup__responsive: responsive,
            popup__higher: higher,
            popup__biggerThanWindow: isBiggerThanWindow, // Для маленьких разрешений по высоте либо слишком больших попапов
            popup__small: type === 'small',
            popup__medium: type === 'medium',
            popup__large: type === 'large',
            popup__extraLarge: type === 'extraLarge'
        })

        return (
            <Portal>
                    <div ref="popup" onClick={this.stopProp} className={_className} bddmark={bddmark}>
                        {this.props.children}
                    </div>
            </Portal>
        )
    }

}


export default activavledRenderer({delay: 300})(Popup)