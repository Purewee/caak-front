import { useEffect, useState } from "react";

const DefaultViewPostLayout = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <div className="flex flex-row pb-[100px] justify-center mx-[20px]">
        <div className="w-full max-w-[250px]">
          <div className="sticky top-[321px] right-[50px] w-full flex flex-col items-end">
            <div className="flex flex-col items-center w-[60px] h-[226px]">
              <p className="text-[#555555] text-[15px] leading-[18px] font-bold">15</p>
              <span className="mt-[6px] cursor-pointer icon-fi-rs-heart text-[26px] text-[#555555] flex items-center justify-center border border-[#D4D8D8] w-[60px] h-[60px] rounded-full"/>
              <span className="text-[#909090] cursor-pointer text-[20px] icon-fi-rs-bookmark mt-[22px]"/>
              <span className="text-[#909090] cursor-pointer text-[19px] icon-fi-rs-share mt-[24.5px]"/>
              <span className="text-[#909090] cursor-pointer text-[20px] icon-fi-rs-bookmark mt-[21px]"/>
            </div>
          </div>
        </div>
        <div className="mx-[50px]">{children}</div>
        <div className="w-full max-w-[250px]">
          <div className="sticky top-[159px] w-[250px] h-[392px] bg-orange-300">

          </div>
        </div> 
      </div>
    )
  );
};
export default DefaultViewPostLayout;
