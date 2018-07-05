import React, {Component} from 'react';
import { CoinSearchContainer, DepthChartContainer, OrderBookContainer,
    OrderFormContainer, MainChartContainer, TradeHistoryContainer, OrdersStats} from "./index";


import * as orderList from "../jsons/ordersList.json";
import * as coinsList from "../jsons/coinsList.json";
import * as tradeHistory from "../jsons/tradeHistory.json";
import * as bidAsk from "../jsons/bidAsk.json";

class LandingPage extends React.Component {
    render() {
        return (
            <div className="landing-page">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className="column"  style={{width: '25%'}} >
                        <OrderFormContainer
                            askPrice={0.25}
                            bidPrice={0.29}
                            totalCurrBalance={10000}
                            totalPairBalance={10}
                            formName="Buy"
                            currency="XRP"
                            pair="BTC"
                            loggedIn={true}
                        />
                        <OrderFormContainer
                            askPrice={0.0233}
                            bidPrice={1.234}
                            totalCurrBalance={2000}
                            totalPairBalance={600}
                            formName="Sell"
                            currency="XRP"
                            pair="BTC"
                            loggedIn={true}
                        />
                    </div>
                    <div className="column"  style={{width: '55%'}}>
                        <MainChartContainer />
                        <OrdersStats
                            style={{width: '100%'}}
                            orderList={orderList.list}
                            bidAsk={bidAsk.list}
                        />
                    </div>
                    <div className="column"  style={{width: '20%'}}>
                        <TradeHistoryContainer
                            tradeHistory={tradeHistory.list}
                            loggedIn={true}
                            loading={false}
                            style={{margin: '10px'}}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;