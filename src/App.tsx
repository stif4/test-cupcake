import React from "react";
import usePullPairs from "./hooks/usePullPairs";
import MUIDataTable from "mui-datatables";
import "./index.scss";

const App = () => {
  const { dataPairs } = usePullPairs();

  let minRUBUSD = dataPairs[0].RUB / dataPairs[0].USD;
  let minRUBEUR = dataPairs[0].RUB / dataPairs[0].EUR;
  let minEURUSD = dataPairs[0].EUR / dataPairs[0].USD;

  const dataTransform = dataPairs.map((data) => {
    const RUB_USD = data.RUB / data.USD;
    const RUB_EUR = data.RUB / data.EUR;
    const EUR_USD = data.EUR / data.USD;

    if (minRUBUSD > RUB_USD) {
      minRUBUSD = RUB_USD;
    }

    if (minRUBEUR > RUB_EUR) {
      minRUBEUR = RUB_EUR;
    }

    if (minEURUSD > EUR_USD) {
      minEURUSD = EUR_USD;
    }

    return {
      stock: data.stock,
      "RUB/USD": RUB_USD,
      "RUB/EUR": RUB_EUR,
      "EUR/USD": EUR_USD,
    };
  });

  const columns = [
    {
      name: "stock",
      label: "stock",
    },
    {
      name: "RUB/USD",
      label: "RUB/USD",
      options: {
        customBodyRender: (value: number, tableMeta: any) => {
          const isMinvalue = value === minRUBUSD;

          return (
            <div style={{ color: isMinvalue ? "blue" : "" }}>
              {value.toFixed(2)}
            </div>
          );
        },
      },
    },
    {
      name: "RUB/EUR",
      label: "RUB/EUR",
      options: {
        customBodyRender: (value: number) => {
          const isMinvalue = value === minRUBEUR;

          return (
            <div style={{ color: isMinvalue ? "blue" : "" }}>
              {value.toFixed(2)}
            </div>
          );
        },
      },
    },
    {
      name: "EUR/USD",
      label: "EUR/USD",
      options: {
        customBodyRender: (value: number) => {
          const isMinvalue = value === minEURUSD;

          return (
            <div style={{ color: isMinvalue ? "blue" : "" }}>
              {value.toFixed(2)}
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="app">
      {<MUIDataTable title={"Pairs"} data={dataTransform} columns={columns} />}
    </div>
  );
};

export default App;
