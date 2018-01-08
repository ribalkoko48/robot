import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CircularProgressbar from './progress'
import {circleSVG} from './circleSVG'
import CanvasDiagram from './CanvasDiagram.js'

class CircularDiagram extends Component {

    static propTypes = {}

    state = {
        percentage: 0
    }

    detPercentageArr() {
        switch (this.state.percentage) {

            case 1 :
            {
                return [{active: false, value: 350, color: 'red'}, {active: false, value: 150, color: 'blue'}, {active: true, value: 500, color: 'yellow'}]
            }
            case 2 :
            {
                return [{active: true, value: 100, color: 'green'}, {active: false, value: 200, color: 'pink'}, {active: false, value: 700, color: 'red'}]
            }
            case 3 :
            {
                return [{active: false, value: 600, color: 'black'}, {active: true, value: 200, color: 'green'}, {active: false, value: 200, color: 'red'}]
            }
            default:
            {
                return [{active: false, value: 333, color: 'red'}, {active: false, value: 333, color: 'blue'}, {active: false, value: 333, color: 'yellow'}, {active: false, value: 333, color: 'black'}, {active: false, value: 333, color: 'pink'}]
            }
        }
    }

    render() {

        return (<div>
                <div onClick={() => this.setState({percentage: this.state.percentage + 1})}>добавляем 10</div>
                <div onClick={() => this.setState({percentage: this.state.percentage - 1})}>убрать 10</div>
               
                <CanvasDiagram data={this.detPercentageArr()}/>
            </div>
        )
    }

}

export default CircularDiagram