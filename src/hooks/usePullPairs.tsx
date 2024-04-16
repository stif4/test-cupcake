import React from "react";
import { IPair } from "api/types";
import api from "../../api/index";
import { fetchData } from "../../api/fetchData";

const PAIR_INIT: IPair = {
  stock: "",
  RUB: 0.0,
  USD: 0.0,
  EUR: 0.0,
};

const PAIR_INIT_URLS = [api.firstInit, api.secondInit, api.thirdInit];
const PAIR_POLL_URLS = [api.firstPull, api.secondPull, api.thirdPull];

const PAIRS_INIT = [PAIR_INIT, PAIR_INIT, PAIR_INIT];

function usePollPairs() {
  const [dataPairs, setDataPairs] = React.useState(PAIRS_INIT);
  const [error, setError] = React.useState();
  const [isInit, setIsInit] = React.useState(true);

  const getStock = (index: number) => {
    switch (index) {
      case 0: {
        return "first";
      }
      case 1: {
        return "second";
      }
      case 2: {
        return "third";
      }
      default: {
        return "";
      }
    }
  };

  const fetchInit = async () => {
    try {
      const results = await Promise.all(
        PAIR_INIT_URLS.map(async (url, index) => {
          const data = await fetchData(url);
          return { ...data.rates, stock: getStock(index) };
        })
      );
      setDataPairs(results);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const updateState = (newPair: any, index: number) => {
    if (error) {
      setError(undefined);
    }
    setDataPairs((prev) => {
      return prev.map((oldPair, pairIndex) => {
        if (pairIndex === index) {
          return { ...newPair, stock: getStock(index) };
        }
        return oldPair;
      });
    });
  };

  const fetchPoll = async (url: string, time: number, index: number) => {
    setTimeout(async () => {
      try {
        let response = await fetchData(url);
        const newPairs = response.rates;

        updateState(newPairs, index);
        await fetchPoll(url, time, index);
      } catch (error: any) {
        setError(error.message);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await fetchPoll(url, time, index);
      }
    }, time);
  };

  React.useEffect(() => {
    fetchInit();
    setIsInit(false);
  }, []);

  React.useEffect(() => {
    if (!isInit) {
      PAIR_POLL_URLS.forEach((url, index) => {
        fetchPoll(url, 3000, index);
      });
    }
  }, [isInit]);

  return { dataPairs, error, isInit };
}
export default usePollPairs;
