import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './canvasStyle.scss'
import NumberRan from "../NumberRun/index";

class CanvasDiagram extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired
    }

    static defaultProps = {
        diameter: 188, // (int) диаметр круга
        lineWidth: 8,
        textSize: {},
        backGroundCircle_color: '#979797',
        round: false,
        arcPadding: true
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
        this._timer.forEach((id) => {
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

        arr.forEach(({percent}, i) => {
            if (i < position) sum += percent
        })

        return sum
    }

    /**
     * формируется массив с процентами, от общей суммы
     * @param {array} data
     * */
    getPercentData = (data) => {
        const {arcPadding} = this.props
        let sum = 0


        data.forEach(obj => sum += obj.value)

        if (arcPadding) {


            function fixArray() {

                let fixedArray = []
                let allPercent = 0

                data.forEach(({value, active, color}) => {
                    let newPercent = 0
                    const percent = value / sum * 100

                    if (percent < 4) {
                        newPercent += percent
                    } else {
                        newPercent = percent
                    }

                    fixedArray.push({percent: newPercent, active, color})
                })

                fixedArray.forEach(({percent}) => {
                    allPercent += percent
                })

                return {allPercent, fixedArray}
            }

            if (fixArray().allPercent !== 100) {
                fixArray()
            }else {
                return fixArray().fixedArray
            }
        } else {
            return data.map(({value, active, color}) => {
                return {percent: value / sum * 100, active, color}
            })
        }


    }

    /**
     * подготовка данных к отрисовки отрезков
     * @param {array} data
     * @param {number} lineWidth
     * @param {string} backGroundCircle_color
     * */
    getLine = (data, lineWidth, backGroundCircle_color) => {
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
        this.draw(lineWey, lineStyle, true)

        // отрисовка отрезков в зависимости от наполненности data
        percentData.forEach(({percent, active, color}, i, arr) => {
            const percentSum = this.getPercentSum(i, arr)
            const endPercent = percent

            /* let time = 50

           for (let i = percentSum; i < percentSum + endPercent; i += 1) {

                this._timer.push(setTimeout(()=> {*/
            lineStyle.color = color
            lineStyle.lineWidth = active ? lineWidth : lineWidth * 0.6

            lineWey.startArc = this.getPosition(percentSum)
            lineWey.endArc = this.getPosition(percentSum + endPercent)

            this.draw(lineWey, lineStyle, active)
            /*}, time))

            time += 10
        }*/
        })
    }

    /**
     * рисуем отрезок круга
     * @param {object} lineWey
     * @param {object} lineStyle
     * @param {boolean} active
     * */
    draw = (lineWey, lineStyle, active) => {

        const {diameter, round} = this.props
        const {startArc, endArc} = lineWey
        const {color, lineWidth} = lineStyle
        const canvas = this.canvas

        const width = diameter / 2
        const height = diameter / 2
        const radius = active ? diameter / 2 - lineWidth * 0.6 : diameter / 2 - lineWidth
        const context = canvas.getContext("2d")

        context.beginPath();

        context.arc(width, height, radius, startArc, endArc, false);
        context.lineWidth = lineWidth
        context.strokeStyle = color;
        context.lineCap = round ? "round" : ''
        context.stroke();
    }

    render() {
        const {data, diameter, textSize} = this.props
        const wrapperStyle = {width: `${diameter}px`, height: `${diameter}px`, position: 'relative'}
        const defTextStyle = {
            lineHeight: `${diameter}px`,
            display: 'flex',
            justifyContent: 'center'
        }
        const textStyle = Object.assign(defTextStyle, textSize)

        let indicatorsSum = 0
        data.forEach(({value}) => indicatorsSum += value)

        return (
            <div style={wrapperStyle} className="canvasDiagram">
                <div style={textStyle}>
                    <NumberRan number={indicatorsSum} />
                </div>
            </div>
        )
    }

}

export default CanvasDiagram