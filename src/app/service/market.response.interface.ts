export interface MarketResponse {
    price: number;
    sequence: number;
    size: number;
    symbol_id: string;
    taker_side: 'SELL';
    time_coinapi: string;
    time_exchange: string;
    type: string;
    uuid: string;
}