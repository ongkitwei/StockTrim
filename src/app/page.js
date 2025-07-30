"use client";
import SearchInput from "@/ui/SearchInput";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [inputvalue, setInputvalue] = useState("");
  const [jsondata, setJsondata] = useState([]);
  const [filteredTickerSearchInput, setFilteredTickerSearchInput] = useState(
    []
  );
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
      console.log(json);
    }
    getLastClose();
    fetchJsonData();
  }, []);

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

  function handleTickerSearchResults() {
    setInputvalue("");
    setFilteredTickerSearchInput([]);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-6">
      <div className="w-full h-[70px] flex items-center justify-center bg-white">
        Header with details
      </div>
      <div className="w-full h-[350px] flex flex-col items-center bg-white py-6 gap-y-1">
        <SearchInput
          getTickerSearch={handleTickerSearchInput}
          value={inputvalue}
        />
        <ul
          className={`bg-white border border-gray-300 w-[60%] max-h-60 overflow-y-auto rounded shadow-lg z-10 ${
            filteredTickerSearchInput == "" ? "hidden" : null
          }`}
        >
          {filteredTickerSearchInput.map((x, index) => (
            <li
              key={index}
              className="flex flex-row items-center justify-between cursor-pointer px-4 py-2 hover:bg-gray-100 border-b border-gray-300"
              onClick={handleTickerSearchResults}
            >
              <div className="flex flex-col">
                <strong className="text-info text-xl">
                  {x["Symbol"] || x["ACT Symbol"]}
                </strong>
                <p>{x["Security"] || x["Company Name"]}</p>
              </div>
              <div className="flex flex-col items-end justify-center text-sm">
                <p>{x["GICS Sector"] || ""}</p>
                <p className="text-slate-600">{x["GICS Sub-Industry"] || ""}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
