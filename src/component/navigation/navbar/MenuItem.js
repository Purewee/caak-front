const menuItems = [
    { title: "Видео" },
    { title: "ПОДКАСТ" },
    { title: "РАДИО" },
    { title: "TOP 100" },
    { title: "МЭДЭЭНИЙ ТӨРӨЛ", sub: [{ title: "Улс төр" }, { title: "Нийгэм" }] },
  ];
  const MenuItems = () => {
    return (
      <ul className={"uppercase text-white font-bold text-[14px] p-0 ml-[40px]"}>
        {menuItems.map((item, index) => {
          return (
            <li
              key={index}
              className={
                "flex hover:text-caak-primary flex-row items-center list-none mr-[40px] cursor-pointer float-left"
              }
            >
              {item.title}
              {item.sub ? (
                <div className={"w-[14px] h-[14px] flex items-center ml-[8px]"}>
                  <span
                    className={
                      "icon-fi-rs-down-chevron text-[12px] text-caak-primary"
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
  