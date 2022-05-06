import { useState, useEffect } from "react";
import NavbarPostHeaderCard from "./NavbarPostHeaderCard";
import {ESService} from "../../../lib/esService";

const NavbarPostHeader = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const es = new ESService('caak');
    es.boostedPosts().then(setPosts);
  }, []);

  return (
    <div
      className={
        "relative flex flex-col lg:flex-row items-center justify-center h-full min-h-[436px] bg-blue-500 w-full"
      }
    >
      { posts.length > 0 && <div style={{ flex: 1 }} className={"h-full w-full"}>
        <NavbarPostHeaderCard type={"wide"} item={posts[0]} />
      </div>}

      <div style={{ flex: 1 }} className={"flex flex-row w-full h-full"}>
        {
          posts.map((post, index) => {
            if (index !== 0 && index <= 2) {
              return (
                <div key={index} style={{ flex: 1 }} className={"h-full w-full"}>
                  <NavbarPostHeaderCard
                    index={index}
                    key={post.id}
                    item={post}
                  />
                </div>
              );
            } else {
              return null
            }
          })
        }
      </div>
    </div>
  )
};

export default NavbarPostHeader;
