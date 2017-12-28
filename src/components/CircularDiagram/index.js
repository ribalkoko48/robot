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

    detPercentageArr(){

        switch (this.state.percentage){

            case 1 : {
                return [20, 40, 40]
            }
            case 2 : {
                return [30, 60, 10]
            }
            case 3 : {
                return [10, 10, 80]
            }
            default: {
                return [33.33, 33.33, 33.33]
            }
        }


        //
    }

    render() {

        return (<div>
                <div onClick={() => this.setState({percentage: this.state.percentage + 1})}>добавляем 10</div>
                <div onClick={() => this.setState({percentage: this.state.percentage - 1})}>убрать 10</div>
                <div style={{width: '100px'}}>
                   {/* <CircularProgressbar percentage={this.detPercentageArr()} text="%" textNumber={650}/>*/}
                    <CanvasDiagram percentage={this.detPercentageArr()} />

                </div>
            </div>
        )
    }

}

export default CircularDiagram