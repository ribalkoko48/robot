import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'


class PhotoCard extends Component {

    static propTypes = {
        photo: PropTypes.object.isRequired
    }

    state = {
        animated: false
    }

    componentDidMount() {
        this.animate(this.props.timeout)
    }

    componentWillReceiveProps(next) {
        if ((next.data && next.data.id) !== (this.props.data && this.props.data.id)) {
            this.setState({animated: false})
            this.animate()
        }
    }

    componentWillUnmount() {
        return this._timer && clearTimeout(this._timer)
    }

    animate(timer) {
        this._timer = setTimeout(() => {
            this.setState({animated: true})
        }, timer || 400)
    }


    render() {
        const {link, id, images} = this.props.photo
        const {url} = images.low_resolution
        const _className = classnames('checkTemplate', {
            checkTemplate__animated: this.state.animated
        })

        return (
            <div className={_className}>
                <div className="checkTemplate--inner">
                    <img src={url}/>
                    <p>photo id</p>
                    <p>{id}</p>
                    <a href={link}>Переход в Instagramm</a>
                </div>
            </div>
        )

    }

}

export default PhotoCard