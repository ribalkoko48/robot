import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './canvasStyle.scss'

class CanvasDiagram extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired
    }

    static defaultProps = {
        diameter: 88, // (int) диаметр круга
        lineWidth: 8,
        backGroundCircle_color: 'gray'
    }

    componentDidMount() {
        const {diameter, data, lineWidth, backGroundCircle_color} = this.props
        this._timer = []
        const canvas = document.createElement('canvas')
        canvas.setAttribute('width', diameter)
        canvas.setAttribute('height', diameter)
        this.canvas = canvas
        this.getLine(data, lineWidth, backGroundCircle_color)
        const canvasWrap = document.querySelector('.canvasDiagram')
        canvasWrap.appendChild(canvas)
    }

    componentWillReceiveProps(nextProps) {
        this._timer.length && this._timer.forEach((id)=> {
            clearTimeout(id)
        })
        this._timer = []
        const {diameter, data, lineWidth, backGroundCircle_color} = nextProps
        this.canvas.getContext("2d").clearRect(0, 0, diameter, diameter)
        this.getLine(data, lineWidth, backGroundCircle_color)
    }

    /**
     * конвертирует % в радианы
     * @param {number} percent
     * */
    getPosition(percent) {

        const factor = Math.PI * 2 / 100

        return percent * factor
    }

    /**
     * суммирет проценты предыдущих отрезков
     * @param {number} position
     * @param {array} arr
     * */
    getPercentSum(position, arr) {
        let sum = 0

        arr.forEach(({percent}, i)=> {
            if (i < position) sum += percent
        })

        return sum
    }

    /**
     * формируется массив с процентами, от общей суммы
     * @param {array} data
     * */
    getPercentData(data) {
        let sum = 0
        data.forEach(obj => sum += obj.value)

        return data.map(({value, active, color}) => {
            return {percent: value / sum * 100, active, color}
        })
    }

    /**
     * подготовка данных к отрисовки отрезков
     * @param {array} data
     * @param {number} lineWidth
     * @param {string} backGroundCircle_color
     * */
    getLine(data, lineWidth, backGroundCircle_color) {
        // https://jsfiddle.net/FunnyBanana/3f48mz4L/
        const percentData = this.getPercentData(data)

        let lineStyle = {
            color: backGroundCircle_color,
            lineWidth: lineWidth
        }
        let lineWey = {
            startArc: 0,
            endArc: Math.PI * 2
        }

        // отрисовка backGroundCircle_color
        this.draw(lineWey, lineStyle)

        // отрисовка отрезков в зависимости от наполненности data
        percentData.forEach(({percent, active, color}, i, arr) => {
            const percentSum = this.getPercentSum(i, arr)
            const endPercent = percent - 6
            let time = 50

            for (let i = percentSum; i < percentSum + endPercent; i += 1) {

                this._timer.push(setTimeout(()=> {
                    lineStyle.color = color
                    lineStyle.lineWidth = active ? lineWidth : lineWidth * 0.6

                    lineWey.startArc = this.getPosition(i)
                    lineWey.endArc = this.getPosition(i + 1)

                    this.draw(lineWey, lineStyle)
                }, time))

                time += 5
            }
        })
    }

    /**
     * рисуем отрезок круга
     * @param {object} lineWey
     * @param {object} lineStyle
     * */
    draw = (lineWey, lineStyle) => {
        const {diameter} = this.props
        const canvas = this.canvas
        const width = diameter / 2
        const height = diameter / 2
        const radius = width / 2
        const context = canvas.getContext("2d");
        const {startArc, endArc} = lineWey
        const {color, lineWidth} = lineStyle

        context.beginPath();

        context.arc(width, height, radius, startArc, endArc, false);
        context.lineWidth = lineWidth
        context.strokeStyle = color;
        context.lineCap = "round";
        context.stroke();
    }

    render() {
        return (
            <div className="canvasDiagram"></div>
        )
    }

}

export default CanvasDiagram