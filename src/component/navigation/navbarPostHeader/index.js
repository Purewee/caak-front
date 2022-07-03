import { useState, useEffect } from 'react';
import NavbarPostHeaderCard from './NavbarPostHeaderCard';
import { ESService } from '../../../lib/esService';
import useMediaQuery from '../useMediaQuery';

const NavbarPostHeader = () => {
  const [posts, setPosts] = useState([]);
  const isLaptop = useMediaQuery('(min-width: 1001px) and (max-width: 1920px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 1000px)');
  const isMobile = useMediaQuery('screen and (max-width: 767px)');

  useEffect(() => {
    const es = new ESService('caak');
    es.boostedPosts().then(setPosts);
  }, []);

  return (
    isLaptop && (
      <div className={`relative flex flex-col lg:flex-row items-center justify-center h-full min-h-[560px] w-full`}>
        <div className="min-h-[480px] w-full navBarPostHeaderCardGradient absolute bottom-0 z-10" />
        {posts.length > 0 && (
          <div style={{ flex: 1 }} className={'h-full w-full'}>
            <NavbarPostHeaderCard type={'wide'} item={posts[0]} />
          </div>
        )}

        <div style={{ flex: 1 }} className={'flex flex-row w-full h-full'}>
          {posts.map((post, index) => {
            if (index !== 0 && index <= 2) {
              return (
                <div key={index} style={{ flex: 1 }} className={'h-full w-full'}>
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
