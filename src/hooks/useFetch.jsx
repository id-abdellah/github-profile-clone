import { useEffect } from "react";
import { useState } from "react";

export const BASE_URL = "https://api.github.com";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    setData(data);
                    setError(false)
                } else {
                    setError(true)
                }
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [url])

    return { data, isLoading, error }
}