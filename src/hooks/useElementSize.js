const {useEffect, useState} = require("react");

export default function useElementSize(ref) {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        setWindowSize({
            width: ref.current.getBoundingClientRect().width,
            height: ref.current.getBoundingClientRect().height,
        });
    }, []);

    return windowSize;
}