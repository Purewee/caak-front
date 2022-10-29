import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from 'antd';

function LoadMore({ callback }) {
  const { ref, inView } = useInView({ threshold: 0 });
  React.useEffect(() => {
    if (inView && callback) callback();
  }, [inView]);
  return (
    <div ref={ref}>
      <Skeleton />
    </div>
  );
}

export default LoadMore;
