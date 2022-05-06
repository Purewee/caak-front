const CommentItemSkeleton = ({ width }) => {
  return (
    <div
      className={
        "flex flex-row items-center my-[4px] leading-[24px] tracking-[0.21px] animate-pulse"
      }
    >
      <div className={"flex flex-row items-center"}>
        <div className={"w-[24px] h-[24px] bg-gray-300  rounded-full"} />
        <div
          className={
            "text-14px font-medium w-[60px] bg-gray-300 h-[12px] text-caak-generalblack rounded-full mx-[8px]"
          }
        />
      </div>

      <div
        style={{ width: width }}
        className={`text-14px text-caak-generalblack rounded-full h-[12px] bg-gray-300`}
      />
    </div>
  );
};

export default CommentItemSkeleton;
