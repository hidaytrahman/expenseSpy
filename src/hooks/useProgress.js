import { useEffect, useState } from "react";

const useProgress = (completed, target) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const c = Math.ceil(completed / target * 100);
        setProgress(c)
        //console.log(progress);
    }, [completed, target]);

    return progress;
}

export default useProgress;