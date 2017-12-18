import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'
import Portal from '../../../src/components/Portal'
import activavledRenderer from '../../../src/components/activabledRenderer'

function factory(Portal) {
    class OverlayBlank extends Component {

        static propTypes = {
            active: PropTypes.bool,
            children: PropTypes.node,
            className: PropTypes.string,
            higher: PropTypes.bool,
            onClick: PropTypes.func,
            theme: PropTypes.oneOf(['dark', 'light', 'transparent']),
            onEscKeyDown: PropTypes.func
        };

        static defaultProps = {
            theme: 'dark'
        };

        componentDidMount() {
            if (this.props.active) {
                this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this))
                // document.body.style.overflow = 'hidden';
                // document.documentElement.classList.add('hidden_scroll')
            }
        }

        /* componentWillUpdate(nextProps) {

            if (nextProps.active && !this.props.active)  document.documentElement.classList.add('hidden_scroll');
            if (!nextProps.active && this.props.active)  setTimeout(()=>{
                document.documentElement.classList.remove('hidden_scroll')
            }, 300)
        }; */

        componentDidUpdate() {
            if (this.props.active && !this.escKeyListener) {
                this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this))
            }
        }

        componentWillUnmount() {
            document.body.style.overflow = null
            if (this.escKeyListener) {
                document.body.removeEventListener('keydown', this.handleEscKey)
                this.escKeyListener = null
            }
        }

        handleEscKey(e) {
            if (this.props.active && this.props.onEscKeyDown && e.which === 27) {
                this.props.onEscKeyDown(e)
            }
        }

        render() {
            const {active, className, children, onClick, theme, higher} = this.props
            const _className = classnames('overlayComponent', {
                overlayComponent__active: active,
                overlayComponent__higher: higher,
                overlayComponent__light: theme == 'light',
                overlayComponent__transparent: theme == 'transparent'
            }, className)

            if (Portal) {
                return (
                    <Portal>
                        <div className={_className} onClick={onClick}>
                            {children}
                        </div>
                    </Portal>
                )
            }
            return (
                <div className={_className} onClick={onClick}>
                    {children}
                </div>
            )
        }
    
    }

    return OverlayBlank
}

// Обычный Overlay который можно использовать как угодно. Например в попапе он маунтится совместно с попапом
export const Overlay = factory()

// А в лоадере используется уже activavledRenderer
// При деавтивации удаляется из дома
export default activavledRenderer({delay: 300})(factory(Portal))