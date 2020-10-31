export const RESPONSE = {
  _200: (data = {}) => ({
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: JSON.stringify(data),
  }),
  _400: (data = {}) => ({
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 400,
    body: JSON.stringify(data),
  }),
  _500: (data = {}) => ({
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 500,
    body: JSON.stringify(data),
  }),
};
