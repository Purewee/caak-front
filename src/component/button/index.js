import { forwardRef } from 'react';
import Loader from '../loader';

const Button = (
  { skin, round, circular, iconPosition, icon, loading, roundedSquare, disabled, small, className, ...props },
  ref,
) => {
  return (
    <button
      {...props}
      ref={ref}
      className={`button ${className ? className : ''} ${small ? 'small' : ''} ${skin ? skin : ''} ${
        round ? 'round' : ''
      } ${(disabled || loading) && 'bg-caak-titaniumwhite text-caak-shit cursor-not-allowed'} ${
        circular ? 'circular' : ''
      } ${roundedSquare ? 'rounded-square' : ''} ${props.className}`}
      disabled={disabled || loading}
    >
      {iconPosition === 'left' ? icon : ''}
      {circular || roundedSquare ? icon : ''}
      {loading ? <Loader className={`${skin === 'white' ? 'bg-caak-primary' : 'bg-white'}`} /> : props.children}
      {iconPosition === 'right' ? icon : ''}
    </button>
  );
};
export default forwardRef(Button);
