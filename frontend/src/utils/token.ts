import Cookies from 'js-cookie';

const TokenKey = 'Permission-Token';

/**
 * 获取存储在 cookie 中的 token。
 */
export function getToken(): string | undefined {
  return Cookies.get(TokenKey); // 返回值可能是 string 或 undefined
}

/**
 * 设置 token 到 cookie 中。
 * 
 * @param token - 要设置的 token 字符串。
 */
export function setToken(token: string): void {
  Cookies.set(TokenKey, token);
}

/**
 * 从 cookie 中移除 token。
 */
export function removeToken(): void {
  Cookies.remove(TokenKey);
}