import { useEffect, useState } from "react";

export default function useDebounce(value) {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(async () => {
            setDebounceValue(value)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [value])

    return debounceValue
}