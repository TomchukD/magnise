import { API_KEY } from 'app/service/base-api';

export const baseParam = {
    type: 'hello',
    apikey: API_KEY,
    heartbeat: false,
    subscribe_data_type: ['trade'],
    subscribe_update_limit_ms_quote: 2000
};