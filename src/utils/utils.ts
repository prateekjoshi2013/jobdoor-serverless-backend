import { decode } from 'jsonwebtoken'

import { JwtPayload } from '../models/JwtPayload'

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseJwtToken(jwtToken: string): JwtPayload {
  const decodedJwt = decode(jwtToken) as JwtPayload
  return decodedJwt;
}

export function getToken(header: string): string {
    const authorization = header;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    return jwtToken;
  }