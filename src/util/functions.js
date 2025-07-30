import yahooFinance from "yahoo-finance2";

// Get last close price
export const getLastClosePrice = async (ticker) => {
  try {
    const result = await yahooFinance.quote(ticker);
    if (result == undefined) {
      console.log("undefined");
    }
    const lastClose = result.regularMarketPreviousClose;
    console.log(`Last close prices for watchlist ticker: `, lastClose);
    return lastClose;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
