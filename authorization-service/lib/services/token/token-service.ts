export function parseBasic(token: string): { login: string; password: string } {
  const b64auth = token.split(' ')[1];

  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  return {
    login,
    password,
  };
}
