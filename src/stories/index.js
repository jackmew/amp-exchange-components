import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { OrderBook, OrderForm } from "../components";
import { OrderBookContainer, OrderFormContainer, CoinSearchContainer, TradeHistoryContainer,
    DepthChartContainer, MainChartContainer, HomePage, LandingPage, OrdersStats,
    OrderHistoryContainer } from "../containers";

import * as orderList from "../jsons/ordersList.json";
import * as coinsList from "../jsons/coinsList.json";
import * as tradeHistory from "../jsons/tradeHistory.json";
import * as orderHistory from "../jsons/orderHistory.json";
import * as sellOrders from "../jsons/sellOrders.json";
import * as bidAsk from "../jsons/bidAsk.json";

import '../App.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../styles/css/style.css";
import "@blueprintjs/table/lib/css/table.css";

storiesOf('HomePage', module).add('Home Page', () => <HomePage />);

// storiesOf('LandingPage', module).add('Landing Page', () => <LandingPage />);
storiesOf('MainChartContainer', module).add('Main Chart', () => <MainChartContainer />);

storiesOf('Order Book', module)
  .add('Loading', () => <OrderBookContainer
      orderList={orderList.list}
      bookName="Sell"
      loading={true}
      currency="ETH"
      pair="BTC"
  />)
  .add('Sell Order', () => <OrderBookContainer
      orderList={orderList.list}
      bookName="Sell"
      currency="ETH"
      pair="BTC"
  />)
  .add('Buy Order', () => <OrderBook
      orderList={orderList.list}
      currency="ETH"
      bookName="Buy"
      pair="USDT"
  />);

storiesOf('Order Stats', module)
  .add('Loading', () => <OrdersStats
      style={{width: '100%'}}
      orderList={orderList.list}
      bidAsk={bidAsk.list}
  />);

storiesOf('Order Form', module)
    .add('Logged Out State', () => <OrderFormContainer
        askPrice={0.25}
        bidPrice={0.29}
        totalCurrBalance={1000}
        totalPairBalance={10}
        formName="Sell"
        currency="ETH"
        pair="BTC"
        loggedIn={false}
    />)
    .add('Sell Book', () => <OrderFormContainer
        askPrice={0.25}
        bidPrice={0.29}
        totalCurrBalance={1000}
        totalPairBalance={10}
        formName="Sell"
        currency="ETH"
        pair="BTC"
        loggedIn={true}
    />)
    .add('Buy Book', () => <OrderFormContainer
        askPrice={0.25}
        bidPrice={0.29}
        totalCurrBalance={10000}
        totalPairBalance={10}
        formName="Buy"
        currency="XRP"
        pair="BTC"
        loggedIn={true}
    />);

storiesOf('Coin Searcher', module)
    .add('Loading', () => <CoinSearchContainer
        coinsList={coinsList.list}
        loading={true}
        small={false}
    />)
    .add('Not Loading', () => <CoinSearchContainer
        coinsList={coinsList.list}
        loading={false}
        small={false}
    />)
    .add('Small Searcher', () => <CoinSearchContainer
        coinsList={coinsList.list}
        loading={false}
        small={true}
    />);

storiesOf('Trade History', module)
    .add('Loading', () => <TradeHistoryContainer
        tradeHistory={tradeHistory.list}
        loading={true}
    />)
    .add('Not LoggedIn', () => <TradeHistoryContainer
        tradeHistory={tradeHistory.list}
        loggedIn={false}
        loading={false}
    />)
    .add('LoggedIn', () => <TradeHistoryContainer
        tradeHistory={tradeHistory.list}
        loggedIn={true}
        loading={false}
    />);

storiesOf('Order History', module)
    .add('Loading', () => <OrderHistoryContainer
        orderHistory={orderHistory.list}
        loggedIn={true}
        loading={true}
    />)
    .add('Not LoggedIn', () => <OrderHistoryContainer
        orderHistory={orderHistory.list}
        loggedIn={false}
        loading={false}
    />)
    .add('LoggedIn', () => <OrderHistoryContainer
        orderHistory={orderHistory.list}
        loggedIn={true}
        loading={false}
    />);

storiesOf('Depth Graph', module)
    .add('Loading', () => <DepthChartContainer
        data={bidAsk.list}
        loading={true}
        title="Price (BTC/USDT)"
    />)
    .add('Not Loading', () => <DepthChartContainer
        data={bidAsk.list}
        loading={false}
        title="Price (BTC/USDT)"
    />);







// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
