import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData, parseData, parseDate } from "../../utils/services"
import {Loading, StandardSelect, MultiSelect} from "../../components";
import ChartLoadingScreen from "./ChartLoadingScreen";
import { Card, Overlay, Icon, Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";



const timeSpans = [
    { name: '1 min' },
    { name: '5 min' },
    { name: '15 min' },
    { name: '30 min' },
    { name: '1 hr' },
    { name: '4 hr' },
    { name: '12 hr' },
    { name: '1 day' },
    { name: '7 days' },
    { name: '1 month' }
].map((p, index) => ({...p, rank: index}));

const indicators = [
    { name: 'Volume', active: true, height: 0 },
    { name: 'Trendline', active: true, height: 0 },
    { name: 'MACD', active: true, height: 150 },
    { name: 'RSI', active: false, height: 150 },
    { name: 'ATR', active: false, height: 150 },
    { name: 'ForceIndex', active: false, height: 300 },
    { name: 'Reset', active: false, height: 0 },
].map((p, index) => ({...p, rank: index}));


export default class SmallChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            chartHeight: 400,
            indicatorHeight: 150,
            showIndicatorMenu: false,
            showTimeSpanMenu: false,
            currentTimeSpan: '',
            indicators: indicators,
            timeSpans: timeSpans,
            expandedChard: false
        }
    }

    getObjectFromArray = (arr, name) => {
        let foundObj = {};
        arr.map((obj) => {
            if(obj.name === name) {
                foundObj = obj;
            }
        })
        return foundObj;
    }

    toogleChartIndicator = (ind) => {
        if (ind.name === "Reset") {
            this.state.indicators = indicators;
        }
        else {
            let indicatorTemp = this.getObjectFromArray(this.state.indicators, ind.name);
            if (ind.name === "MACD") {
                this.state.indicators[3].active = false;
            }
            else if (ind.name === "RSI") {
                this.state.indicators[2].active = false;
            }
            indicatorTemp.active = !indicatorTemp.active;
        }
        if(!this.state.indicators[2].active && !this.state.indicators[3].active) {
            this.setState({
                chartHeight: 550
            })
        }
        else {
            this.setState({
                chartHeight: 400
            })
        }
        this.forceUpdate();
        console.log(this.state.indicators)
    }
    componentDidMount() {
        const self = this;
        getData().then(data => {
            self.setState({ data: data })
        })

    }
    changeDuration = (menu) => {
        if(menu === "indicator") {
            this.setState(function (prevState) {
                return {
                    showIndicatorMenu: !prevState.showIndicatorMenu
                }
            })
        }
        else if (menu === "timespan") {
            this.setState(function (prevState) {
                return {
                    showTimeSpanMenu: !prevState.showTimeSpanMenu
                }
            })
        }
    }
    changeTimeSpan = e => {
        this.setState({ currentTimeSpan: e })
    }
    toggleExpand = () => {
        this.setState((prevState) => {
            return {
                expandedChard: !prevState.expandedChard
            }
        })
    }

    render() {
        return (
            <Card  className="pt-dark main-chart">
                <Toolbar
                    changeDuration={this.changeDuration}
                    toggleExpand={this.props.toggleExpand}
                    toogleChartIndicator={this.toogleChartIndicator}
                    changeTimeSpan={this.changeTimeSpan}
                    state={this.state}
                />
                <ChartLoadingScreen
                    volume={this.state.indicators[0]}
                    line={this.state.indicators[1]}
                    macd={this.state.indicators[2]}
                    rsi={this.state.indicators[3]}
                    atr={this.state.indicators[4]}
                    forceIndex={this.state.indicators[5]}
                    indicatorHeight={this.state.indicatorHeight}
                    chartHeight={this.state.chartHeight}
                    data={this.state.data}
                    expandedChard={this.props.expandedChard}
                    width="100%"
                />
            </Card>
        )
    }
}

const Toolbar = ({ state, toogleChartIndicator, changeTimeSpan, changeDuration, toggleExpand }) => (
    <div className="toolbar">
        <div className="menu time-span">
            <StandardSelect
                items={state.timeSpans}
                item={state.currentTimeSpan || timeSpans[0]}
                handleChange={changeTimeSpan}
                icon="series-add"
            />
        </div>
        <div className="menu">
            <MultiSelect
                items={state.indicators}
                item={{name: 'Indicators'}}
                handleChange={toogleChartIndicator}
                icon="series-search"
            />
        </div>
        <div className="menu duration">
            <Icon icon="time"/>
            <Button onClick={changeDuration("1 hr")} text="1h"/>
            <Button onClick={changeDuration("6 hr")} text="6h"/>
            <Button onClick={changeDuration("1 day")} text="1d"/>
            <Button onClick={changeDuration("3 days")} text="3d"/>
            <Button onClick={changeDuration("7 days")} text="7d"/>
            <Button onClick={changeDuration("1 month")} text="1m"/>
            <Button onClick={changeDuration("3 months")} text="3m"/>
            <Button onClick={changeDuration("6 months")} text="6m"/>
        </div>
        <Button icon="fullscreen" onClick={toggleExpand}/>
    </div>
)