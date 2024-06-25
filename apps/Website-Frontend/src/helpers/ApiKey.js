const API_URL =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_API_URL_PRODUCTION
        : import.meta.env.VITE_API_URL_DEVELOPMENT;

console.log(`Running in ${import.meta.env.MODE} mode`);
console.log(`API URL: ${API_URL}`);

export default API_URL;
