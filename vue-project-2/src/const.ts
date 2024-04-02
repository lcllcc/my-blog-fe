export const API_BASE_URL: string = import.meta.env.VITE_APP_ENV === 'prod'? 'http://liuchanglei.com':'http://localhost:5173';
export const WS_BASE_URL: string = import.meta.env.VITE_APP_ENV === 'prod'? 'ws://liuchanglei.com':'ws://localhost:9999';
