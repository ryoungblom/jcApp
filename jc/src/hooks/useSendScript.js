import { useState, useEffect} from 'react'

function useSendScript(url) {
    const [data, sendData] = useState(null);

    console.log ("Data Received!")

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => sendData(data))
        .catch((err) => console.log(`Error: ${err}`));
    }, [url]);

    return { data };
}

export default useSendScript
