import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class NumberRan extends Component {

    static propTypes = {
        number: PropTypes.number
    }

    static defaultProps = {
        number: 0
    }

    state = {
        number: this.props.number
    }

    componentWillReceiveProps(nextProps) {
        this.timwrs && this.timwrs.forEach((timerId) => clearTimeout(timerId))

        this.startAnimation(nextProps.number)
    }

    startAnimation = (newNumber) => {
        const difference = this.state.number < newNumber ? newNumber - this.state.number : this.state.number - newNumber
        const time = 500 / newNumber
        let timeStep = 0
        const upperOrLower = this.state.number < newNumber ? 1 : -1
        this.timwrs = []

        for (let i = 0; i < difference; i += 1) {
            const timerId = setTimeout(() => {
                this.setState({
                    number: Math.round(this.state.number += upperOrLower)
                })
            }, timeStep)
            this.timwrs.push(timerId)

            timeStep += time
        }
    }

    render() {
        return (
            <span>{this.state.number}</span>
        )
    }
}

export default NumberRan