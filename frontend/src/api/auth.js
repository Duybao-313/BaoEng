import { request } from './client'

/**
 * Dang nhap bang username + password.
 * Backend: `POST /auth/login` — xem `Docs/API_Specification.md` muc 2.2.
 *
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ accessToken: string, tokenType: string, expiresIn: number, user: object }>}
 */
export async function login({ username, password }) {
  const payload = await request('/auth/login', {
    method: 'POST',
    body: { username, password },
  })
  return payload.data
}
