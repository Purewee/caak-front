import { Link } from "react-router-dom";
import logoIconLight from "../../images/New-Logo-Light.svg";
import logoIcon from "../../images/New-Logo.svg";

const Logo = ({ navBarStyle, className }) => {

    return (
        <div
            className={`relative flex flex-shrink-0 flex-row items-center ${className}`}
        >
            <Link to={'/'}>
                <div
                    className={
                    "w-[112px] flex flex-shrink-0 flex-row items-center pr-[12px]"
                    }
                >
                    <img
                        src={navBarStyle ? logoIconLight : logoIcon}
                        className="cursor-pointer object-contain"
                        alt="Caak Logo"
                        width={112}
                        height={34}
                    />
                </div>
            </Link>
        </div>
    );
};
export default Logo;
