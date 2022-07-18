import React, { useState } from 'react';
import { notification } from 'antd';

//prettier-ignore
const reports = [
    {
        id: 1,
        name: 'Худал мэдээлэл'
    },
    {
        id: 2,
        name: 'Нэр төрд халдсан'
    },
    {
        id: 3,
        name: 'Спам'
    },
    {
        id: 4,
        name: 'Зохиогчийн эрх зөрчсөн'
    },
    {
        id: 5,
        name: 'Луйвар'
    },
    {
        id: 6,
        name: 'Бусад'
    },
]

export default function ReportModal({ isOpen, setIsOpen }) {
  const [checked, setChecked] = useState();

  let pl;

  const handleChange = (e) => {
    setChecked(e.target.value);
  };

  const openNotification = () => {
    const args = {
      message: 'Таны репортыг хүлээн авлаа. Танд баярлалаа :)',
      duration: 4,
      placement: 'bottom',
      className: 'h-[50px] bg-[#12805C] w-[470px]',
    };
    notification.open(args);
  };

  //prettier-ignore
  return (
    isOpen && (
    <div className="popup_modal">
        <div className="popup_modal-content w-[480px] rounded-[4px] py-[18px] z-[3]">
            <p className="text-[26px] font-condensed font-bold leading-[30px] ml-[24px]">Репорт</p>
            <div className='reportModalItemsContainer border-t mt-[14px]'>
                {reports.map((report, index) => {
                  return (
                    <div
                      key={index}
                      className={`reportModalItem odd:border-r pl-[10px] flex items-center border-b py-[15px] min-w-[230px] cursor-pointer`}
                    >
                      <input
                        id={report.id}
                        type="radio"
                        onChange={(e) => handleChange(e)}
                        value={report.name}
                        checked={checked === report.name}
                        name="report"
                        className={`mr-2 ${pl}`}
                      />
                      <label
                        className="cursor-pointer text-15px"
                        htmlFor={report.id}
                      >
                        {report.name}
                      </label>
                    </div>
                  );
                })}
            </div>
            <div className='flex flex-row justify-end w-full pr-[24px] mt-[18px]'>
                <button 
                    className='w-[76px] h-[34x] rounded-[4px] border text-caak-black font-medium text-[15px] border-[#D4D8D8] mr-[10px]' 
                    onClick={() => setIsOpen(false)}
                >
                    Болих
                </button>
                <button 
                    className='h-[34px] bg-caak-primary text-white text-[15px] font-bold rounded-[4px] w-[82px]' 
                    onClick={() => {
                        openNotification();
                        setIsOpen(false);
                    }}
                >
                    Илгээх
                </button>
            </div>
        </div>
    </div>
    )
  );
}
