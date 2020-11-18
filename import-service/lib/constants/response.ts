export const RESPONSE = {
  _200: (data = {}) => ({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(data),
  }),
  _400: (data = {}) => ({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 400,
    body: JSON.stringify(data),
  }),
  _500: (data = {}) => ({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 500,
    body: JSON.stringify(data),
  }),
};
