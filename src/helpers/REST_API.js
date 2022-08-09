import { useState, useEffect } from "react";

const url = 'http://minsta-server.herokuapp.com';

const MethodLoad = (method, payload) => {
    
    if (method === "GET" || method === "DELETE") {
        return { method: method };
    }
    else if (method === 'POST' || method === "PATCH") {
        return {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
    }
    else return "Invalid Method";
}

const REST_API_Async = ({ path, method, payload }) => {
    const load = MethodLoad(method, payload);
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setError] = useState(null);

    // console.log(path, load);
    useEffect(() => {

        fetch(url+path, load)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json()
            })
            .then(data => {
                // console.log(data);
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            });
    }, [path])
    return { data, setData, isPending, isError };
}

const REST_API_Sync = async ({ path, method, payload }) => {

    const load = MethodLoad(method, payload);
    if(!load.method) return {err:load};

    try {
        const fetchRes = await fetch(url+path, load);
        const result = await fetchRes.json()
        console.log('Success:', result);
        return { result };
    }
    catch (err) {
        // console.error('Error:', err);
        return { err };
    };
}
export { REST_API_Sync, REST_API_Async };