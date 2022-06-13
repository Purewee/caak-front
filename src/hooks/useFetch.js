import { useEffect, useRef } from 'react';
import useObserver from './useObserver';

const useInfiniteScroll = (data, setData, itemRef) => {
  const callbackRef = useRef();

  const _setCallback = (func) => {
    callbackRef.current = func;
  };
  const onScreen = useObserver(itemRef);

  useEffect(() => {
    if (onScreen) {
      if (callbackRef.current) {
        callbackRef.current(data, setData);
      }
    }
    // eslint-disable-next-line
  }, [onScreen]);

  return [_setCallback];
};

export default useInfiniteScroll;
