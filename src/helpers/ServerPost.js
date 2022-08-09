const ServerPost = async (url,data)=>{

    try {
        const fetchRes = await fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await fetchRes.json()
        // console.log('Success:', result);
        
        return {result};
    } 
    catch (err){
        // console.error('Error:', err);
        return {err};  
    };
}
export { ServerPost };