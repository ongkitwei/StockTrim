import { NextResponse } from "next/server";
import { getLastClosePrice } from "../../../util/functions";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticker = searchParams.get("ticker");
    if (!ticker) {
      return NextResponse.json(
        { error: "Ticker is required" },
        { status: 400 }
      );
    }

    const data = await getLastClosePrice(ticker);

    console.log("Basic stock data", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
