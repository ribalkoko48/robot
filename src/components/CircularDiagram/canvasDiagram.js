import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './canvasStyle.scss'

class CanvasDiagram extends Component {

    static propTypes = {
        percentage: PropTypes.array.isRequired
    }

    getLine(percentage, lineWidth, width) {
        if (!this.canvasRed || !this.canvasBlue || !this.canvasYellow) return false
        console.log(lineWidth)
        // https://jsfiddle.net/FunnyBanana/3f48mz4L/
        percentage.forEach((_procent, i) => {
            let canvas = this.canvasRed
            let color = 'green'

            if (i === 1) {
                color = 'red'
                canvas = this.canvasBlue
            }
            if (i === 2) {
                color = 'yellow'
                canvas = this.canvasYellow
            }

            const procent = (_procent > 0 && _procent < 100) ? Math.round(_procent * 10) / 10 : 0
            this.drow(canvas, procent, lineWidth - 4, width, color)
        })

    }

    getCircle(lineWidth, width) {
        const borderColor = 'gray' // тута мы меняем цвет

        if (!this.canvasCir) return false
        // Выравниваем текст по вертикали
        const canvas = this.canvasCir

        this.drow(canvas, 99.9, lineWidth, width, borderColor)
    }

    drow(canvas, _procent, lineWidth, width, color) {
        const context = canvas.getContext("2d");
        const procent = (_procent > 0 && _procent < 100) ? Math.round(_procent * 10) / 10 : 0
        const radian = 2 * Math.PI * procent / 100
        context.clearRect(0, 0, 88, 88)
        context.beginPath();
        // рисуем круг с процентами
        context.arc(width / 2 + lineWidth / 2, width / 2 + lineWidth / 2, width / 2, 1.5 * Math.PI, radian + 1.5 * Math.PI, false);
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
        this.getLine(percentage, lineWidth, width)
        this.getCircle(lineWidth, width)

        return (
            <div style={styleObj}>
                <canvas ref={(can) => this.canvasCir = can} width={88} height={88} />
                <canvas ref={(can) => this.canvasRed = can} width={88} height={88} />
                <canvas ref={(can) => this.canvasBlue = can} width={88} height={88} />
                <canvas ref={(can) => this.canvasYellow = can} width={88} height={88} />
            </div>
        )
    }

}

export default CanvasDiagram