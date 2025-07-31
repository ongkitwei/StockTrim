import yahooFinance from "yahoo-finance2";

// Get last close price
export const getLastClosePrice = async (ticker) => {
  try {
    const result = await yahooFinance.quote(ticker);
    if (result == undefined) {
      console.log("undefined");
    }
    console.log(result);
    const lastClose = result.regularMarketPreviousClose;
    console.log(`Last close prices for watchlist ticker: `, lastClose);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export function formatNumber(num) {
  if (num > 0) {
    return "+" + num;
  } else {
    return "" + num; // Convert to string for consistent return type
  }
}

export function formatEarningsDate(dateToBeFormatted) {
  const date = new Date(dateToBeFormatted);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
