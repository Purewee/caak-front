import { useEffect, useState } from 'react';

const DefaultViewPostLayout = ({ children, post }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <div className="flex flex-row pb-[100px] justify-center mx-[20px]">
        <div className="w-full max-w-[250px]">
          <div className=" hidden md:flex sticky top-[321px] right-[50px] w-full flex-col items-end">
            <div className="flex flex-col items-center w-[60px] h-[226px]">
<<<<<<< HEAD
              <p className="text-[#555555] text-[15px] leading-[18px] font-bold">15</p>
              <span className="mt-[6px] cursor-pointer icon-fi-rs-heart text-[26px] text-[#555555] flex items-center justify-center border border-[#D4D8D8] w-[60px] h-[60px] rounded-full" />
              <span className="text-[#909090] cursor-pointer text-[20px] icon-fi-rs-bookmark mt-[22px]" />
              <span className="text-[#909090] cursor-pointer text-[19px] icon-fi-rs-share mt-[24.5px]" />
              <span className="text-[#909090] cursor-pointer text-[20px] icon-fi-rs-bookmark mt-[21px]" />
=======
              <p className="text-[#555555] text-[15px] leading-[18px] font-bold">{post.data.like_count}</p>
              <span className="mt-[6px] cursor-pointer icon-fi-rs-heart text-[26px] text-[#555555] flex items-center justify-center border border-[#D4D8D8] w-[60px] h-[60px] rounded-full"/>
              <span className="text-[#909090] cursor-pointer text-[20px] icon-fi-rs-bookmark mt-[22px]"/>
              <span className="text-[#909090] cursor-pointer text-[19px] icon-fi-rs-share mt-[24.5px]"/>
              <span className="text-[#909090] cursor-pointer text-[20px] icon-fi-rs-bookmark mt-[21px]"/>
>>>>>>> 3ad4f850a4484e2668ebc5621cfd739b77f4dd35
            </div>
          </div>
        </div>
        <div className="mx-[50px]">{children}</div>
<<<<<<< HEAD
        <div className="w-full max-w-[250px]">
          <div className="sticky top-[159px] w-[250px] h-[392px] bg-orange-300"></div>
        </div>
=======
        <div className="w-full hidden md:flex max-w-[250px]">
          <div className="sticky top-[159px] w-[250px] h-[392px] bg-orange-300">

          </div>
        </div> 
>>>>>>> 3ad4f850a4484e2668ebc5621cfd739b77f4dd35
      </div>
    )
  );
};
export default DefaultViewPostLayout;
