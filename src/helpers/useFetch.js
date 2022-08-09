import { useEffect, useState } from 'react';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setError] = useState(null);

    // console.log(url);
    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json()
            })
            .then(data => {
                setData(data);
                
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            });
    }, [url]);

    return { data, setData,isPending, isError };
}

export default useFetch;