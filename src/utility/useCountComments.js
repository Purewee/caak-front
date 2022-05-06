import {useEffect, useState} from "react";

const useCountComments = (comments) => {
    const [totalComments, setTotalComments] = useState(0);
    useEffect(() => {
        let total = 0;
        for (let i = 0; i < comments.length; i++) {
            total += comments[i].totals && comments[i].totals.comments;
        }
        setTotalComments(total);
    }, [comments]);
    return totalComments;
};
export default useCountComments;