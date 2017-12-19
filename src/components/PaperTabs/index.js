import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import './style.scss';
import Link from "../Link/index.js";

class PaperTabs extends Component {

    static propTypes = {
        checked: PropTypes.string.isRequired,
        theme: PropTypes.oneOf(['inSection', 'inWidget']).isRequired,
        tabs: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            route: PropTypes.string,
            count: PropTypes.number
        })),
        onChange: PropTypes.func
    };

    static defaultProps = {
        theme: 'inSection'
    }

    onClick = (value) => () => {
        this.props.onChange && this.props.onChange(value)
    }

    render() {
        const {tabs, theme, checked} = this.props;
        const _classname = classnames('paperTabs', 'paperTabs__' + theme)


        return (
            <nav className={_classname}>
                {
                    tabs.map(item => {
                        const {value, label, count, route} = item;
                        const isChecked = checked === value;
                        const _tabClass = "paperTabs--itemWrap" + (isChecked ? " paperTabs--itemWrap__checked" : "")

                        return (
                            <Link key={value}
                                  className={_tabClass}
                                  onClick={this.onClick(value)}
                                  to={route}>
                                <span className="paperTabs--itemLabel">
                                    {label}
                                    {count ?
                                        <span className="paperTabs--itemCount">{count}</span>
                                        : null}
                                    </span>
                            </Link>
                        )
                    })
                }
            </nav>
        )
    }

}

export default PaperTabs