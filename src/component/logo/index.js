import { Link } from "react-router-dom";
import logoIconLight from "../../images/New-Logo-Light.svg";
import logoIcon from "../../images/New-Logo.svg";

const Logo = ({ navBarStyle, className, mobile }) => {

    return (
        <div
            className={`relative flex flex-shrink-0 flex-row items-center ${className}`}
        >
            <Link to={'/'}>
                <div
                    className={
                    `${mobile ? 'w-[110px] h-[33px]' : 'w-[140px] h-[42px]'} flex flex-shrink-0 flex-row items-center`
                    }
                >
                    <img
                        src={navBarStyle ? logoIconLight : logoIcon}
                        className="cursor-pointer h-full w-full object-contain"
                        alt="Caak Logo"
                    />
                </div>
            </Link>
        </div>
    );
};
export default Logo;
