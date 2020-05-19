import React, { useState } from "react";

import "./App.css";

import PortfolioValue from "./components/PortfolioValue";

const ASSETS = ["BTC", "ETH", "USDC", "DAI"];

const getInitialState = () => {
  const state = {};
  ASSETS.forEach((item) => (state[item] = "0"));
  return state;
};

const App = () => {
  const [portfolio, setPortfolio] = useState(getInitialState());

  return (
    <div className="app">
      <ul>
        {ASSETS.map((asset) => (
          <li key={asset}>
            <input
              value={portfolio[asset]}
              onChange={(event) => {
                const newPortfolio = {
                  ...portfolio,
                  [asset]: event.target.value,
                };

                setPortfolio(newPortfolio);
              }}
              type="number"
            />{" "}
            {asset}
          </li>
        ))}
      </ul>
      <PortfolioValue portfolio={portfolio} />
    </div>
  );
};

export default App;
