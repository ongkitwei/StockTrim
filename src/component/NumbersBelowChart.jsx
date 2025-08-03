import React from "react";

function NumbersBelowChart({
  marketCap,
  trailingPE,
  priceToBook,
  epsTrailingTwelveMonths,
}) {
  return (
    <div className="grid grid-cols-3 place-items-center">
      <div className="flex flex-col items-center justify-center">
        <p>Market Cap - {marketCap}</p>
        <p>PE Ratio - {trailingPE}</p>
        <p>peg ratio</p>
        <p>Price To Book - {priceToBook}</p>
        <p>EPS (TTM) - {epsTrailingTwelveMonths}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>marketCap</p>
        <p>trailingPE</p>
        <p>peg ratio</p>
        <p>priceToBook</p>
        <p>epsTrailingTwelveMonths</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>marketCap</p>
        <p>trailingPE</p>
        <p>peg ratio</p>
        <p>priceToBook</p>
        <p>epsTrailingTwelveMonths</p>
      </div>
    </div>
  );
}

export default NumbersBelowChart;
