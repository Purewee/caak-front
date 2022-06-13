import React from 'react';

const Loader = ({ className, containerClassName, ...props }) => {
  return (
    <div className={`spinner ${containerClassName}`} {...props}>
      <div className={`bounce1 ${className}`} />
      <div className={`bounce2 ${className}`} />
      <div className={`bounce3 ${className}`} />
    </div>
  );
};

export default Loader;
