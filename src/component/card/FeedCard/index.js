import CardFooter from "./CardFooter";
import FeedCardSkeleton from "../../skeleton/FeedCardSkeleton";

const FeedCard = ({
  post,
  loading,
  className,
}) => {

  // onClick={() => router.push(`/post/view/${post.id}`)}

  return (
    post && (
      <div
        className={`${
          className ?? ""
        } feedCard relative w-[422px] h-[523px] bg-white border-b border-[#EFEEEF]`}
      >
        {loading ? (
          <FeedCardSkeleton />
        ) : (
          <>
            <img alt="" src={`http://graph.caak.mn${post.image}`} className="h-[300px] cursor-pointer w-full object-cover" />
            <CardFooter
              postId={post.id}
              title={post.title}
              postUser={post.user}
              post={post}
            />
          </>
        )}
      </div>
    )
  );
};

export default FeedCard;
