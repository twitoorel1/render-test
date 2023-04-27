export const getLocalStorageValue = (key, isNeedParse = false) => {
    const value = localStorage.getItem(key);
    if (value) return console.log(`No item with key: ${key}`);
    return isNeedParse ? JSON.parse(value) : value;
}

export const setLocalStorageValue = (key, value) => {
    value = typeof value !== "string" ? JSON.stringify(value) : value;
    return localStorage.setItem(key, value);
}

export const deleteLocalStorageValue = (name) => {
    return localStorage.removeItem(name);
}