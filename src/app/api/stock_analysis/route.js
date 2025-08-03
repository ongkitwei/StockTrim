import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { convertToNumber } from "@/util/functions";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticker = searchParams.get("ticker");
    console.log(ticker);
    if (!ticker) {
      return NextResponse.json(
        { error: "Ticker is required" },
        { status: 400 }
      );
    }
    const response = await fetch(
      `https://stockanalysis.com/stocks/${ticker}/metrics/revenue-by-segment/`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0", // Required to avoid bot block
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch StockAnalysis data");

    const html = await response.text();
    const $ = cheerio.load(html);

    const segmentName = [];
    const revenue = [];
    const date = [];

    // 1. Extract segment name
    $("table thead tr th").each((i, el) => {
      if (i == 0) return;
      const text = $(el).text().trim();
      console.log(text);
      if (text.length > 0) {
        segmentName.push(text);
      }
    });

    // 2. Extract segment names and revenues from tbody rows
    $("table tbody tr").each((_, el) => {
      // Segment name is usually in the <th> of the row
      const dateIndividual = $(el).find("td").eq(0).text().trim();
      if (dateIndividual) {
        date.push(dateIndividual);
      }

      // Revenues are in the <td> cells
      const revs = [];
      $(el)
        .find("td")
        .slice(1)
        .each((_, td) => {
          revs.push(convertToNumber($(td).text().trim()));
        });
      revenue.push(revs);
    });

    // Reverse order to show older dates to newer dates
    revenue.reverse();
    date.reverse();
    // segmentName.reverse();

    return new Response(JSON.stringify({ segmentName, revenue, date }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
