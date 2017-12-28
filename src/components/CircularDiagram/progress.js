import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'

const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;
const MAX_X = 100;
const MAX_Y = 100;
const FULL_RADIUS = 50;
const CENTER_X = 50;
const CENTER_Y = 50;

class CircularProgressbar extends React.Component {

    state = {
        percentage: this.props.percentage || [0, 0, 0]
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            percentage: nextProps.percentage,
        });
    }

    getPathDescription() {
        const radius = this.getPathRadius();
        const rotation = this.props.counterClockwise ? 1 : 0;

        // Move to center of canvas
        // Relative move to top canvas
        // Relative arc to bottom of canvas
        // Relative arc to top of canvas
        return `
      M ${CENTER_X},${CENTER_Y}
      m 0,-${radius}
      a ${radius},${radius} ${rotation} 1 1 0,${2 * radius}
      a ${radius},${radius} ${rotation} 1 1 0,-${2 * radius}
    `;
    }

    getProgressStylePlus() {
        const [_percentage] = this.state.percentage
        const diameter = Math.PI * 2 * this.getPathRadius();
        const truncatedPercentage = Math.min(Math.max(_percentage, MIN_PERCENTAGE), MAX_PERCENTAGE);
        const dashoffset = ((100 - truncatedPercentage) / 100) * diameter;

        return {
            strokeDasharray: `${diameter}px ${diameter}px`,
            strokeDashoffset: `${dashoffset}px`,
        };
    }

    getProgressStyleMinus() {
        const [some, _percentage] = this.state.percentage
        const diameter = Math.PI * 2 * this.getPathRadius();
        const truncatedPercentage = Math.min(Math.max(_percentage, MIN_PERCENTAGE), MAX_PERCENTAGE);
        const dashoffset = ((100 - truncatedPercentage) / 100) * diameter;

        return {
            strokeDasharray: `${diameter}px ${diameter}px`,
            strokeDashoffset: `${-dashoffset}px`,
        };
    }

    getPathRadius() {
        return FULL_RADIUS - (this.props.strokeWidth / 2)
    }

    getDeviderPuth(){

    }

    render() {
        const {percentage, text, textNumber, className, classes, strokeWidth} = this.props;
        const classForPercentage = this.props.classForPercentage ? this.props.classForPercentage(percentage) : '';
        const pathDescription = this.getPathDescription();


        return (
            <svg
                className={`${classes.root} ${className} ${classForPercentage}`}
                viewBox={`0 0 ${MAX_X} ${MAX_Y}`}
            >
                <path
                    className={classes.trail}
                    d={pathDescription}
                    strokeWidth={strokeWidth - 1}
                    fillOpacity={0}
                />

                <path
                    className={classes.pathMinus}
                    d={pathDescription}
                    strokeWidth={strokeWidth}
                    fillOpacity={0}
                    style={this.getProgressStyleMinus()}
                />

                <path
                    className={classes.pathPlus}
                    d={pathDescription}
                    strokeWidth={strokeWidth}
                    fillOpacity={0}
                    style={this.getProgressStylePlus()}
                />
                {/* <path
                    className={classes.pathMiddle}
                    d={dMiddle}
                    strokeWidth={strokeWidth}
                    fillOpacity={0}
                    style={this.getProgressStyleMiddle()}
                />*/}

                {
                    text ? (
                        <text
                            className={classes.text}
                            x={CENTER_X}
                            y={CENTER_Y}
                        >
                            {`${textNumber} ${text}`}
                        </text>
                    ) : null
                }
            </svg>
        );
    }
}

CircularProgressbar.propTypes = {
    percentage: PropTypes.array.isRequired,
    className: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string),
    strokeWidth: PropTypes.number,
    background: PropTypes.bool,
    backgroundPadding: PropTypes.number,
    initialAnimation: PropTypes.bool,
    counterClockwise: PropTypes.bool,
    classForPercentage: PropTypes.func,
    text: PropTypes.string,
    textNumber: PropTypes.number,
};

CircularProgressbar.defaultProps = {
    strokeWidth: 8,
    className: '',
    classes: {
        root: 'CircularProgressbar',
        trail: 'CircularProgressbar-trail',
        pathPlus: 'CircularProgressbar-pathPlus',
        pathMinus: 'CircularProgressbar-pathMinus',
        pathMiddle: 'CircularProgressbar-pathMiddle',
        text: 'CircularProgressbar-text',
        background: 'CircularProgressbar-background',
    },
    background: false,
    backgroundPadding: null,
    initialAnimation: false,
    counterClockwise: false,
    classForPercentage: null,
    text: '',
    textNumber: 0
};

export default CircularProgressbar;