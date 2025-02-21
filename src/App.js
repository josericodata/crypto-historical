import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://query1.finance.yahoo.com/v8/finance/chart/BTC-USD?range=30d&interval=1d"
        );
        const prices = response.data.chart.result[0].indicators.quote[0].close;
        setData(prices);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Crypto Historical Data</h1>
      <ul>
        {data.map((price, index) => (
          <li key={index}>Day {index + 1}: ${price.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
