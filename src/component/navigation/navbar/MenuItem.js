import DropDown from "../DropDown";
import React, {useState} from "react";
import { useClickOutSide } from "../../../utility/Util";

const menuItems = [
  { title: "Видео", link: 'https://www.youtube.com/c/caakvideo' },
  { title: "ПОДКАСТ", link: 'https://soundcloud.com/caak-podcast' },
  { title: "РАДИО", link: 'https://www.caak.mn/radio/' },
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
            ref={menuRef}
            onClick={toggleMenu}
            key={index}
            className={
              "flex flex-row relative items-center list-none mr-[40px] cursor-pointer float-left"
            }
          >
            {
              item.link 
              ?
              <a rel="noreferrer" href={item.link} target="_blank">
                <p className="hover:text-caak-primary">{item.title}</p>
              </a>
              :
              <p className="hover:text-caak-primary">{item.title}</p>
            }
            {
              item.sub && (
                <div
                  className={"w-[14px] h-[14px] flex items-center ml-[8px]"}
                >
                  <span
                    className={
                      "icon-fi-rs-down-chevron text-[12px] text-caak-primary"
                    }
                  />
                </div>
              )
            }
            {
              item.sub && (
                <DropDown
              arrow={'centerTop'}
              className="absolute -left-[160px] rounded-[8px] top-[30px]"
              open={isMenuOpen}
              onToggle={toggleMenu}
              content={
                <div className={"columns-3 py-[24px] px-[28px]"}>
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
              )
            }
          </li>
        );
      })}
    </ul>
  );
};

export default MenuItems;



  