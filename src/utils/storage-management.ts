/**
 * Token 的 key 值
 */
export const KEY_TOKEN = "token";

/**
 * 儲存資料到 sessionStorage 或 localStorage
 *
 * @param key 要儲存的資料的 key 值
 * @param value 要儲存的資料
 * @param type 把資料儲存到哪裡，預設為 SessionStorage
 */
export const storeInStorage = <T = string>(
  key: string,
  value: T,
  type: "SESSION" | "LOCAL" = "SESSION"
) => {
  const strValue = JSON.stringify(value);
  if (type === "SESSION") {
    sessionStorage.setItem(key, strValue);
  } else {
    localStorage.setItem(key, strValue);
  }
};

/**
 * 從 sessionStorage 或 localStorage 取得資料
 *
 * @param key 要取得的資料的 key 值
 * @param type 從哪裡取得資料，預設為 SessionStorage
 */
export const getFromStorage = <T = string>(
  key: string,
  type: "SESSION" | "LOCAL" = "SESSION"
) => {
  const value =
    type === "SESSION"
      ? sessionStorage.getItem(key)
      : localStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
};

/**
 * 從 sessionStorage 或 localStorage 移除指定的資料
 *
 * @param key 要移除的資料的 key 值
 * @param type 從哪裡移除資料，預設為 SessionStorage
 */
export const removeFromStorage = (
  key: string,
  type: "SESSION" | "LOCAL" = "SESSION"
) => {
  if (type === "SESSION") {
    sessionStorage.removeItem(key);
  } else {
    localStorage.removeItem(key);
  }
};

/**
 * 清空 sessionStorage 或 localStorage 的資料
 *
 * @param type 清空哪裡的資料，預設為 SessionStorage
 */
export const clearStorage = (type: "SESSION" | "LOCAL" = "SESSION") => {
  if (type === "SESSION") {
    sessionStorage.clear();
  } else {
    localStorage.clear();
  }
};
