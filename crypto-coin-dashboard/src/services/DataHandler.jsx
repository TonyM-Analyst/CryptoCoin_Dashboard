import React, { useState, useEffect } from "react";
import axios from "axios";

const DataHandler = ({ endpoint, fromCurrency, toCurrency, apiKey }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const endpointFunctions = {
    DIGITAL_CURRENCY_WEEKLY: "DIGITAL_CURRENCY_WEEKLY",
    CURRENCY_EXCHANGE_RATE: "CURRENCY_EXCHANGE_RATE",
    DIGITAL_CURRENCY_DAILY: "DIGITAL_CURRENCY_DAILY",
    DIGITAL_CURRENCY_MONTH: "DIGITAL_CURRENCY_MONTHLY",
  };

  useEffect(() => {
    if (!endpointFunctions[endpoint]) {
      setError("Invalid endpoint specified");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const params = {
          function: endpointFunctions[endpoint],
          apikey: apiKey,
        };

        if (endpoint === "CURRENCY_EXCHANGE_RATE") {
          params.from_currency = fromCurrency;
          params.to_currency = toCurrency;
        } else {
          params.symbol = fromCurrency;
          params.market = toCurrency;
        }

        const response = await axios.get("https://www.alphavantage.co/query", {
          params,
        });

        if (response.data) {
          const processedData = processCryptoData(response.data, endpoint);
          setData(processedData);
        } else {
          setError("No data received");
        }
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, fromCurrency, toCurrency, apiKey]);

  const processCryptoData = (rawData, endpoint) => {
    if (endpoint === "DIGITAL_CURRENCY_WEEKLY") {
      const timeSeries = rawData["Time Series (Digital Currency Weekly)"];
      if (!timeSeries) return null;

      // Process weekly time series data into an array of objects
      return Object.entries(timeSeries).map(([date, values]) => ({
        date,
        open: parseFloat(values["1a. open (USD)"]),
        high: parseFloat(values["2a. high (USD)"]),
        low: parseFloat(values["3a. low (USD)"]),
        close: parseFloat(values["4a. close (USD)"]),
        volume: parseFloat(values["5. volume"]),
      }));
    }
    return rawData;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Data for {endpoint}</h3>
      {Array.isArray(data) ? (
        <ul>
          {data.slice(0, 10).map((entry, index) => (
            <li key={index}>
              <strong>Date:</strong> {entry.date}, <strong>Open:</strong> {entry.open}, <strong>Close:</strong> {entry.close}
            </li>
          ))}
        </ul>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default DataHandler;
