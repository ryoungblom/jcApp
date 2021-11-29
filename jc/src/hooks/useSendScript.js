import { useState, useEffect} from 'react'

function useSendScript(url) {
    const [data, sendData] = useState(null);

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log(`Error: ${err}`));
    }, [url]);

    return { data };
}

export default useSendScript
