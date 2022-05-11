import DropDown from "../DropDown";
import React, {useState} from "react";
import { useClickOutSide } from "../../../utility/Util";

const menuItems = [
  { title: "Видео" },
  { title: "ПОДКАСТ" },
  { title: "РАДИО" },
  { title: "TOP 100" },
  { title: "МЭДЭЭНИЙ ТӨРӨЛ", sub: [{ title: "Улс төр" }, { title: "Нийгэм" }] },
];

const subMenu = [
  {
    title: 'Хөгжилтэй'
  },
  {
    title: 'Кино'
  },
  {
    title: 'Загвар'
  },
  {
    title: 'Гэрэл зураг'
  },
  {
    title: 'Спорт'
  },
  {
    title: 'Тоглоом'
  },
  {
    title: 'Шинжлэх ухаан'
  },
  {
    title: 'Гэр бүл'
  },
  {
    title: 'Гоо сайхан'
  },
  {
    title: 'Аялал'
  },
  {
    title: 'Амьтад'
  },
  {
    title: 'Энтэртайнмент'
  },
  {
    title: 'Хоол'
  },
]

const MenuItems = ({navBarStyle}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  return (
    <ul className={`uppercase ${navBarStyle ? 'text-white' : 'text-[#555555]'} font-bold text-[14px] p-0 ml-[40px]`}>
      {menuItems.map((item, index) => {
        return (
          <li
            key={index}
            className={
              "flex flex-row items-center list-none mr-[40px] cursor-pointer float-left"
            }
          >
            <p className="hover:text-caak-primary">{item.title}</p>
            {item.sub ? (
                        <div
                          ref={menuRef}
                          onClick={toggleMenu} 
                          className={"w-[14px] relative h-[14px] flex items-center ml-[8px]"}
                        >
                          <span
                            className={
                              "icon-fi-rs-down-chevron text-[12px] text-caak-primary"
                            }
                          />
                          <DropDown
                            arrow={'centerTop'}
                            className="absolute left-[-330px] bg-white rounded-[8px] top-[30px]"
                            open={isMenuOpen}
                            onToggle={toggleMenu}
                            content={
                              <div className={" columns-3 py-[24px] px-[28px]"}>
                                {
                                  subMenu.map((data, index) => {
                                    return(
                                      <p key={index} className="text-[#111111] mb-[12px] leading-[18px] font-roboto text-[15px]">{data.title}</p>
                                    )
                                  })
                                }
                              </div>
                            }
                          />
                        </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default MenuItems;



  