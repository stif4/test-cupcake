export interface IPairPrespons {
  rates: {
    RUB: number;
    USD: number;
    EUR: number;
  };
  timestamp: number;
  base: string;
  date: string;
}

export interface IPair {
  stock: string;
  RUB: number;
  USD: number;
  EUR: number;
}
