import { Link } from 'react-router-dom';
import logoIconLight from '../../images/New-Logo-Light.svg';
import logoIcon from '../../images/New-Logo.svg';

const Logo = ({ navBarStyle, className, mobile }) => {
  return (
    <a
      className={`relative flex flex-shrink-0 flex-row items-center ${className}`}
      onClick={() => (window.location.href = '/')}
    >
      <div className={`w-[110px] h-[33px] sm:w-[140px] sm:h-[42px] flex flex-shrink-0 flex-row items-center`}>
        <img
          src={navBarStyle ? logoIconLight : logoIcon}
          className="cursor-pointer h-full w-full object-contain"
          alt="Caak Logo"
        />
      </div>
    </a>
  );
};
export default Logo;
