import { IPair, IPairPrespons } from "./types";

export const fetchData = async (url: string) => {
  try {
    const resonse = await fetch(url);
    const data = await resonse.json();
    return data as IPairPrespons;
  } catch (error: any) {
    throw Error(error.message);
  }
};
