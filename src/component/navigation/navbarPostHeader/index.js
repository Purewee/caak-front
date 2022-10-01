import { useState, useEffect } from 'react';
import NavbarPostHeaderCard from './NavbarPostHeaderCard';
import { ESService } from '../../../lib/esService';
import useMediaQuery from '../useMediaQuery';
import { useHeader } from '../../../context/HeaderContext';

const NavbarPostHeader = () => {
  const [posts, setPosts] = useState([]);
  const { setMode } = useHeader();

  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');

  useEffect(() => {
    const es = new ESService('caak');
    es.boostedPosts().then(setPosts);
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      setMode('transparent');
    }
  }, [posts]);

  return (
    isLaptop &&
    posts.length > 0 && (
      <div className="relative flex flex-col lg:flex-row items-center justify-center h-full min-h-[560px] w-full">
        <div style={{ flex: 1 }} className="h-full w-full">
          <NavbarPostHeaderCard type="wide" item={posts[0]} />
        </div>
        <div style={{ flex: 1 }} className="flex flex-row w-full h-full">
          {posts.map((post, index) => {
            if (index !== 0 && index <= 2) {
              return (
                <div key={index} style={{ flex: 1 }} className="h-full w-full">
                  <NavbarPostHeaderCard index={index} key={post.id} item={post} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    )
  );
};

export default NavbarPostHeader;
