import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './canvasStyle.scss'

class CanvasDiagram extends Component {

    static propTypes = {
        percentage: PropTypes.array.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.percentage !== this.props.percentage) {
            this.canvas.getContext("2d").clearRect(0, 0, 88, 88)
        }
    }

    /**
     * конвертирует % в радианы
     * @param {number} percent
     * */
    getPosititon(percent) {

        const factor = Math.PI * 2 / 100

        return percent * factor
    }

    getColor(position){
        switch (position){
            case 0: {
              return 'red'
            }
            case 1: {
                return 'green'
            }
            case 2: {
                return 'yellow'
            }
            case 3: {
                return 'blue'
            }
            default: {
                return 'black'
            }
        }
    }

    getEndArc(position, arr) {
        let summ = 0

        arr.forEach((percent, i)=>{
            if (i < position) summ += percent
        })

        return summ
    }

    getLine(percentage) {
        // https://jsfiddle.net/FunnyBanana/3f48mz4L/

        let canvas = this.canvas
        let lineStyle = {
            color: 'gray',
            lineWidth: 8
        }
        let lineWey = {
            startArc: 0,
            endArc: Math.PI * 2
        }

        this.drow(canvas, lineWey, lineStyle)

        percentage.forEach((_procent, i, arr) => {
            const percentSumm = this.getEndArc(i ,arr)

            lineStyle.color = this.getColor(i)
            lineStyle.lineWidth = 4
            lineWey.startArc = this.getPosititon(percentSumm)
            lineWey.endArc = this.getPosititon(percentSumm + _procent)

            this.drow(canvas, lineWey, lineStyle)
        })

    }

    drow(canvas, lineWey, lineStyle) {
        const context = canvas.getContext("2d");
        const {startArc, endArc} = lineWey
        const {color, lineWidth} = lineStyle

        context.beginPath();

        context.arc(44, 44, 22, startArc, endArc, false);
        context.lineWidth = lineWidth
        context.strokeStyle = color;
        context.lineCap = "round";
        context.stroke();
    }

    render() {
        const percentage = this.props.percentage
        const width = 80;
        const lineWidth = width / 10
        const size = width + lineWidth
        const styleObj = {"width": size + 'px', "height": size + 'px', "fontSize": Math.floor((width - lineWidth) / 4) + 'px'}
        setTimeout(() => this.getLine(percentage, lineWidth, width), 0)

        return (
            <div className="canvasDiagram" style={styleObj}>
                <canvas ref={(can) => this.canvas = can} width={88} height={88} />
            </div>
        )
    }

}

export default CanvasDiagram