import ActionButtons from "./actionsButtons";
import { Link } from "react-router-dom";

const NavbarPostHeaderCard = ({ type, item }) => {
  return item && (
    <div className={"w-full h-full relative  min-h-[436px]"}>
      <img
        className={"object-cover w-full h-full absolute top-0"}
        alt=''
        src={`http://graph.caak.mn${item.image}`}
        // onClick={() => router.push({
        //   pathname: `/post/view/${item.id}`,
        //   query: item
        // }, `/post/view/${item.id}`)}
      />
      <div
        className={
          "absolute bottom-0 h-full w-full navBarPostHeaderCardGradient"
        }
      />

      <div
        className={`flex flex-col w-full absolute bottom-0 ${
          type === "wide" ? "px-[40px]" : "px-[30px]"
        }  py-[30px] text-white`}
      >
        <div
          className={
            "uppercase text-[14px] font-roboto font-medium tracking-[0.2px] leading-[15px]"
          }
        >
          { item.categories?.map((x) => {
             return (
                  <div key={x.name} className={"flex items-center flex-row"}>
                    <p
                      className={"truncate-1 ml-[6px] text-[14px] font-roboto font-medium tracking-[0.21px] leading-[16px]"}>#{x.name}</p>
                  </div>
             )
            })}
        </div>

        {/* <Link
          as={`/post/view/${item.id}`}
          shallow
          href={{
            query: {
              ...router.query,
              viewPost: "post",
              id: item.id,
              prevPath: router.asPath,
              isModal: true,
            },
          }}
        ></Link> */}
        {/* <a as={`/post/view/${item.id}`} href={{pathname: `/post/view/${item.id}`, query: item}}> */}
            <p
              className={`${
                type === "wide"
                  ? "text-[40px] md:text-[50px] tracking-[0.4px] md:tracking-[0.5px] leading-[46px] md:leading-[56px]"
                  : "text-[24px] md:text-[32px] tracking-[0.2px] md:tracking-[0.32px] truncate-3 leading-[28px] md:leading-[36px]"
              }  font-bold font-robotoCondensed mt-[10px]`}
            >
              {item.title}
            </p>
        {/* </a> */}

        <p
          className={
            "text-[14px] font-roboto font-medium tracking-[0.21px] leading-[16px] mt-[14px]"
          }
        >
          {new Date(item.publish_date).getFullYear()}
          -
          {new Date(item.publish_date).getMonth() + 1}
          -
          {new Date(item.publish_date).getDate()}
        </p>
        <div
          className={
            "flex flex-col md:flex-row flex-wrap justify-between mt-[30px] items-center"
          }
        >
          <div className={"flex flex-row flex-wrap items-center self-start"}>
          <img alt="" src={'https://scontent.fuln2-2.fna.fbcdn.net/v/t1.18169-9/16388375_1258991760846780_6001512035944932012_n.png?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=9pNL5ldMQ0kAX_yAKha&_nc_ht=scontent.fuln2-2.fna&oh=00_AT_3pSN5nwhS6wQvQERY95zTkiYmS9VjFARKCE684yYu1w&oe=6298F67B'} className="w-[22px] h-[22px] rounded-full"/>
            <p className="text-[15px] font-medium font-roboto ml-[6px]">gogo.mn</p>
            &nbsp;
            <Link to={`/profile/${item.author.id}`}>
              <p className={"text-[14px] font-roboto font-medium tracking-[0.21px] leading-[16px]"}>• {item.author?.name.split(' ').slice(0, -1)}</p>
            </Link>
          </div>
          <div className={"flex items-center mt-[10px] md:mt-0 self-end md:self-center"}>
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPostHeaderCard;
