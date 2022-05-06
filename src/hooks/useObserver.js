import { useEffect, useRef, useState } from "react";

export default function useObserver(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observerRef = useRef();

  useEffect(() => {
    if (ref.current) {
      if(observerRef && !observerRef.current){
        observerRef.current = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))
      }
      observerRef.current.observe(ref.current);
    }
    // eslint-disable-next-line
  }, [ref.current]);

  return isIntersecting;
}
