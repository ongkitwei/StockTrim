import { NextResponse } from "next/server";
import { getLastClosePrice } from "../../../util/functions";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticker = searchParams.get("ticker"); // e.g., ?ticker=AAPL
    const data = await getLastClosePrice(ticker);

    console.log("last close returning data", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
