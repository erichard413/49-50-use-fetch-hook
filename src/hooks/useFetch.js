import React, { useState, useEffect } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setData(undefined);
    setIsError(false);
    setIsLoading(true);
    const controller = new AbortController();
    fetch(url, { signal: controller.signal, ...options })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name === "AbortError") return;
        setIsError(true);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });

    //cleanup function
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isError, isLoading };
}

export default useFetch;
