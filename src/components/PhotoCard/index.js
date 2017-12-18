import React, {Component} from 'react'
import classnames from 'classnames'
import './style.scss'


class PhotoCard extends Component {

    state = {
        animated: false,
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

    onEdit = (e) => this.props.onEdit && this.props.onEdit(e)

    animate(timer) {
        this._timer = setTimeout(() => {
            this.setState({animated: true})
        }, timer || 400)
    }


    render() {
        const {className} = this.props

        const _className = classnames('checkTemplate', className, {
            checkTemplate__animated: this.state.animated
        })


        return (
            <div className={_className}>
                <div className="checkTemplate--inner">

                    <div onClick={this.props.onClick} className="fullTemplatePopup--content">
                        картинка
                    </div>

                </div>
            </div>
        )

    }

}

export default PhotoCard