import Cookies from 'js-cookie';

// 设置 Cookie
export const setCookie = (key: string, value: string, days: number = 7) => {
  Cookies.set(key, value, { expires: days });
};

// 获取 Cookie
export const getCookie = (key: string) => {
  return Cookies.get(key);
};

// 删除 Cookie
export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
