import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, initialValue: any) {
    const isLocalStorageAvailable =
        typeof window !== "undefined" && window.localStorage;

    const [value, setValue] = useState(
        isLocalStorageAvailable && localStorage.getItem(key)
            ? localStorage.getItem(key)
            : initialValue
    );

    useEffect(() => {
        if (isLocalStorageAvailable) {
            localStorage.setItem(key, value);
        }
    }, [key, value, isLocalStorageAvailable]);

    const setStoredValue = (newValue: string) => {
        setValue(newValue);
    };

    return [value, setStoredValue];
}
