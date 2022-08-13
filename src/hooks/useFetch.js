import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import {url} from 'helpers/Path'

const MethodLoad = (method, payload, token) => {

    if (method === "GET" || method === "DELETE") {
        return {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    }
    else if (method === 'POST' || method === "PATCH") {
        return {
            method: method,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        };
    }
    else throw Error("Invalid Method");
}

const useFetch = () => {

    const { user } = useAuthContext();

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(null);

    const fetchData = async ({ path, method, payload }) => {
        // console.log(path, method, payload);
        setIsPending(true);
        setData(null);
        setIsError(null);

        try {

            const load = MethodLoad(method, payload, user.token);
            if (!load.method) return { err: load };

            const response = await fetch(url + path, load);
            const json = await response.json();
            // console.log(response, json);
            if (!response.ok) {
                setIsPending(false)
                setIsError(json.error);
            }
            if (response.ok) {
                // console.log(json);
                setData(json);
                setIsPending(false);
                setIsError(null);
                return json;
            }
        } catch (error) {
            console.log(error);
            setIsError(error.message);
        }
    }
    return { fetchData, data, setData, isPending, isError };
}

export default useFetch;