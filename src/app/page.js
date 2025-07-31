"use client";
import SearchInput from "@/ui/SearchInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumber, formatEarningsDate } from "@/util/functions";

export default function Home() {
  const [inputvalue, setInputvalue] = useState("");
  const [jsondata, setJsondata] = useState([]);
  const [filteredTickerSearchInput, setFilteredTickerSearchInput] = useState(
    []
  );
  const [selectedTicker, setSelectedTicker] = useState({});
  const [selectedTickerData, setSelectedTickerData] = useState([]);
  // const filteredTickerSearchInput =
  //   inputvalue.trim() == ""
  //     ? []
  //     : jsondata.filter(
  //         (x) =>
  //           x["Symbol"]?.toLowerCase().includes(inputvalue.toLowerCase()) ||
  //           x["Security"]?.toLowerCase().includes(inputvalue.toLowerCase())
  //       );

  useEffect(() => {
    async function getLastClose() {
      const response = await axios.get(`/api/yahoo_finance`, {
        params: { ticker: "GOOGL" },
      });
      const result = await response.data;
      console.log(result);
    }
    async function fetchJsonData() {
      const response = await fetch("/SnP500.json");
      const json = await response.json();
      setJsondata(json);
    }
    // getLastClose();
    fetchJsonData();
  }, []);

  useEffect(() => {
    if (!selectedTicker?.Symbol) return;
    console.log("test");
    const interval = setInterval(() => {
      getLastClose(selectedTicker?.Symbol);
    }, 70000);

    return () => clearInterval(interval); // cleanup on unmount or symbol change
  }, [selectedTicker]);

  async function handleTickerSearchInput(event) {
    setInputvalue(event.target.value);
    setFilteredTickerSearchInput(
      event.target.value.trim() == ""
        ? []
        : jsondata.filter(
            (x) =>
              x["Symbol"]?.toLowerCase().includes(inputvalue.toLowerCase()) ||
              x["Security"]?.toLowerCase().includes(inputvalue.toLowerCase())
          )
    );
  }

  async function getLastClose(tickerSymbol) {
    const response = await axios.get(`/api/yahoo_finance`, {
      params: { ticker: tickerSymbol },
    });
    const result = await response.data;
    setSelectedTickerData(result);
    console.log(result);
  }

  function handleTickerSearchResults(ticker) {
    // setInputvalue("");
    getLastClose(ticker["Symbol"]);
    setSelectedTicker(ticker);
    setFilteredTickerSearchInput([]);
  }

  return (
    <div className="w-full">
      <div className="relative w-full min-h-[350px] flex flex-col items-center bg-white py-6 gap-y-1">
        <SearchInput
          getTickerSearch={handleTickerSearchInput}
          value={inputvalue}
        />
        <ul
          className={`absolute top-20 bg-white border border-gray-300 w-[60%] max-h-60 overflow-y-auto rounded shadow-lg z-10 ${
            filteredTickerSearchInput == "" ? "hidden" : null
          }`}
        >
          {filteredTickerSearchInput.map((x, index) => (
            <li
              key={index}
              className="flex flex-row items-center justify-between cursor-pointer px-4 py-2 hover:bg-gray-100 border-b border-gray-300"
              onClick={() => handleTickerSearchResults(x)}
            >
              <div className="flex flex-col">
                <strong className="text-info text-xl">{x["Symbol"]}</strong>
                <p>{x["Security"]}</p>
              </div>
              <div className="flex flex-col items-end justify-center text-sm">
                <p>{x["GICS Sector"]}</p>
                <p className="text-slate-600">{x["GICS Sub-Industry"]}</p>
              </div>
            </li>
          ))}
        </ul>
        <div
          className={`pt-8 flex flex-col ${
            selectedTicker?.Symbol ? null : "hidden"
          }`}
        >
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">
              {selectedTicker["Security"]}
            </h1>
            <div className="flex flex-row items-center gap-x-1.5">
              <span className="text-lg">{selectedTicker["Symbol"]}</span>
              <span>|</span>
              <span>{selectedTickerData.fullExchangeName?.toUpperCase()}</span>
            </div>
          </div>
          <div className="flex flex-row items-centder justify-evenly text-sm pt-8 gap-x-2">
            <p className="bg-slate-200 text-black p-2 rounded-lg font-semibold">
              {selectedTicker["GICS Sector"]}
            </p>
            <p className="bg-slate-200 text-black p-2 rounded-lg font-semibold">
              {selectedTicker["GICS Sub-Industry"]}
            </p>
          </div>{" "}
          <div className="flex flex-row items-center justify-center gap-x-4 pt-4">
            <span className="text-md italic font-medium">
              ${selectedTickerData.regularMarketPreviousClose}
            </span>
            <span
              className={`${
                selectedTickerData.regularMarketChange > 0
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-600"
              } p-1.5 rounded-md flex flex-row items-center gap-x-2 font-semibold`}
            >
              <span>
                {formatNumber(
                  selectedTickerData.regularMarketChange?.toFixed(2)
                )}
              </span>
              <span>|</span>
              <span>
                {formatNumber(
                  selectedTickerData.regularMarketChangePercent?.toFixed(2)
                )}
                %
              </span>
            </span>
          </div>
          <div
            className={`${
              selectedTickerData.preMarketPrice ? "flex" : "hidden"
            } flex flex-row items-center justify-center gap-x-4 pt-4`}
          >
            <span className="text-md italic font-medium">
              ${selectedTickerData.preMarketPrice}
            </span>
            <span
              className={`${
                selectedTickerData.preMarketChange > 0
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-600"
              } p-1.5 rounded-md flex flex-row items-center gap-x-2 font-semibold`}
            >
              <span>
                {formatNumber(selectedTickerData.preMarketChange?.toFixed(2))}
              </span>
              <span>|</span>
              <span>
                {formatNumber(
                  selectedTickerData.preMarketChangePercent?.toFixed(2)
                )}
                %
              </span>
            </span>
          </div>
          <div className="flex items-center justify-center pt-12 font-serif">
            <p className="bg-blue-200 text-info px-4 py-1 rounded-md">
              <span>Earnings - </span>
              {formatEarningsDate(selectedTickerData.earningsTimestampStart)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
