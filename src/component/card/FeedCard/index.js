import CardFooter from "./CardFooter";
import FeedCardSkeleton from "../../skeleton/FeedCardSkeleton";
import { Link } from "react-router-dom";

const FeedCard = ({
  post,
  loading,
  className,
  sponsored
}) => {

  return (
    post && (
      <div
        className={`${
          className ?? ""
        } relative w-[422px] h-[523px] bg-white ${!sponsored && 'border-b border-[#EFEEEF]'}`}
      >
        {loading ? (
          <FeedCardSkeleton />
        ) : (
          <>
            <Link to={`/post/view/${post.id}`}>
              <img alt="" src={`http://graph.caak.mn${post.image}`} className="h-[300px] w-full object-cover" />
            </Link>
            <CardFooter
              postId={post.id}
              title={post.title}
              postUser={post.user}
              post={post}
              sponsored={sponsored}
            />
          </>
        )}
        {
          sponsored && 
          <div className="absolute top-[14px] pl-[10px] pr-[12px] pt-[5.3px] pb-[4.3px] left-[14px]  bg-black bg-opacity-60 rounded-[100px] flex flex-row items-center">
            <span className="text-[11.8px] text-white icon-fi-rs-megaphone" />
            <p className="text-white text-[12px] font-bold ml-[4px]">СПОНСОРОД</p>
          </div>
        }
      </div>
    )
  );
};

export default FeedCard;
