import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [myStocks, setMyStocks] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((resp) => resp.json())
      .then((data) => setStocks(data));
  }, []);

  function buyStock(stock) {
    if (!myStocks.includes(stock)) {
      const listOfMyStocks = [...myStocks, stock];
      setMyStocks(listOfMyStocks);
    }
  }

  function sellStock(stock) {
    const listOfMyStocks = [...myStocks].filter(
      (MyStock) => MyStock.id !== stock.id
    );
    setMyStocks(listOfMyStocks);
  }

  useEffect(() => {
    if (sortBy === "Alphabetically") {
      const sortedStocks = sortByName();
      setStocks(sortedStocks);
    } else {
      const sortedStocks = sortByPrice();
      setStocks(sortedStocks);
    }
  }, [sortBy]);

  function sortStocks(e) {
    setSortBy(e.target.value);
  }

  function sortByName() {
    return [...stocks].sort(function (a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

  function sortByPrice() {
    return [...stocks].sort(function (a, b) {
      return a.price - b.price;
    });
  }

  function filterStocks(e) {
    if (e.target.value === "All") {
      setStocks(stocks);
    } else {
      const filteredStocks = [...stocks].filter(
        (stock) => stock.type === e.target.value
      );
      setStocks(filteredStocks);
    }
  }

  return (
    <div>
      <SearchBar
        sortStocks={sortStocks}
        sortBy={sortBy}
        filterStocks={filterStocks}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} handleClick={buyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={myStocks} handleClick={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
