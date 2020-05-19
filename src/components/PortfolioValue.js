import React, { useEffect, useState } from "react";

const fetchValue = async (portfolio) => {
  const assets = Object.keys(portfolio)
    .filter((asset) => portfolio[asset] !== "0")
    .join(",");
  if (assets) {
    try {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${assets}&tsyms=USD,EUR,BRL`
      );
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.log(e);
    }
  }
  return {};
};

const calculateValue = (portfolio, prices, fiat) => {
  let total = 0;

  Object.keys(portfolio).forEach((asset) => {
    const price = prices[asset] ? prices[asset][fiat] || 0 : 0;
    total = total + price * parseFloat(portfolio[asset]);
  });

  return total.toFixed(2);
};

const PortfolioValue = (props) => {
  const { portfolio } = props;

  const [prices, setPrices] = useState({});

  useEffect(() => {
    const request = async () => {
      const value = await fetchValue(portfolio);
      setPrices(value);
    };
    request();
  }, [portfolio]);

  return (
    <div className="portfolio-value">
      <h2>Value:</h2>

      <p>
        <strong>USD:</strong> {calculateValue(portfolio, prices, "USD")}
      </p>
      <p>
        <strong>EUR:</strong> {calculateValue(portfolio, prices, "EUR")}
      </p>
      <p>
        <strong>BRL:</strong> {calculateValue(portfolio, prices, "BRL")}
      </p>
    </div>
  );
};

export default PortfolioValue;
