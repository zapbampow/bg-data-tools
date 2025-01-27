const isDevEnv = import.meta.env.VITE_DEPLOY_ENV === 'dev'
export const baseUrl = isDevEnv ? 'http://127.0.0.1:8000' : 'https://api.bgdatatools.com';

