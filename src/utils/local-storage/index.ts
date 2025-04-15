import { Dispatch, SetStateAction, useCallback, useState } from 'react';

function parseJSON<T>(value: string | null | undefined): T | undefined {
  try {
    return value ? JSON.parse(value) : undefined;
  } catch (error: unknown) {
    console.error(`Cannot parse value "${value}" to JSON object`, error);
    return;
  }
}

//export type LocalStorageValue = number | string | Object | Function;
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((value: T) => T)) => void] {
  const readStorageValue = useCallback((): T => {
    if (window === undefined) {
      console.warn(`Trying to load value from local storage outside browser environment`);
      return initialValue;
    }

    try {
      const entry = window.localStorage.getItem(key);
      const parsedEntry = parseJSON(entry);
      return parsedEntry ? (parsedEntry as T) : initialValue;
    } catch (error: unknown) {
      console.error(`Cannot read key "${key}" from local storage`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readStorageValue);

  const storeValue = (value: T | ((value: T) => T)) => {
    if (window === undefined) {
      console.warn(`Trying to store value in local storage outside browser environment`);
    }

    try {
      const entry = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(entry));
      setStoredValue(entry);
    } catch (error: unknown) {
      console.error(`Cannot store value with key "${key}" in local storage`, error);
    }
  };

  return [storedValue, storeValue];
}
