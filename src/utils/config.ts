
export const {
  REACT_APP_API_BASEURL: API_BASEURL = '/api',
  NODE_ENV = 'production',
} = process.env


export const IS_PRODUCTION = NODE_ENV === 'production'