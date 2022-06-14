const FeedCardSkeleton = () => {
  return (
    <div className={'bg-gray-200 animate-pulse w-full h-[400px] rounded-square mb-[32px] last:mb-0'}>
      <div className={`flex flex-col relative p-[16px] bg-white`}>
        <div className={'flex justify-between items-center h-[34px]'}>
          <div className="flex justify-between items-center h-full">
            <div
              className={`relative bg-gray-200 flex-shrink-0 border border-caak-titaniumwhite rounded-square w-[34px] h-[34px]`}
            />

            <div className="flex flex-col justify-between ml-[8px] h-full">
              <div className={'flex flex-row items-center'}>
                <span className="bg-gray-200 mr-1 font-semibold w-[100px] h-[10px] rounded-[10px] cursor-pointer text-generalblack text-14px leading-[16px] tracking-[0.21px]" />
              </div>
              <span className="bg-gray-200 mr-1 font-semibold w-[140px] h-[10px] rounded-[10px] cursor-pointer text-generalblack text-14px leading-[16px] tracking-[0.21px]" />
            </div>
          </div>
        </div>
        <p className={`h-[10px] bg-gray-200 w-[220px] rounded-[10px] text-caak-generalblack break-words mt-[12px]`} />
      </div>
    </div>
  );
};

export default FeedCardSkeleton;
