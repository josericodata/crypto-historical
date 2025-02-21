import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
          {
            params: {
              vs_currency: "usd",
              days: 30,
              interval: "daily",
            },
          }
        );
        const prices = response.data.prices.map(item => item[1]); // Extract prices
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
