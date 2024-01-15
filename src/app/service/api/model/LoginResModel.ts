export interface LoginResModel{
  "username": string,
  "role": string,
  "isLogin": true,
  "jwtResponse": {
    "token": string,
    "expireAfter": string,
    "refreshToken":string
  }
}
