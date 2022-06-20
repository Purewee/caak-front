import ActionButtons from './actionsButtons';
import { Link } from 'react-router-dom';
import { generateTimeAgo, imagePath } from '../../../utility/Util';
import { Avatar } from 'antd';
import { MetaTag } from '../../../pages/post/view/wrapper';

const NavbarPostHeaderCard = ({ type, item }) => {
  return (
    item && (
      <div className={'w-full h-full relative  min-h-[436px]'}>
        <img
          className={'object-cover w-full h-full absolute top-0'}
          alt=""
          src={imagePath(item.image)}
          // onClick={() => router.push({
          //   pathname: `/post/view/${item.id}`,
          //   query: item
          // }, `/post/view/${item.id}`)}
        />
        <div className={'absolute bottom-0 h-full w-full navBarPostHeaderCardGradient'} />

        <div
          className={`flex flex-col w-full absolute bottom-0 ${type === 'wide' ? 'px-[40px]' : 'px-[30px]'}  py-[30px]`}
        >
          <div className={'uppercase text-[14px] font-roboto font-medium tracking-[0.2px] leading-[15px]'}>
            {item.categories?.map((x) => {
              return (
                <div key={x.name} className={'flex items-center flex-row'}>
                  <p
                    className={
                      'truncate-1 text-white ml-[6px] text-[14px] font-roboto font-medium tracking-[0.21px] leading-[16px]'
                    }
                  >
                    #{x.name}
                  </p>
                </div>
              );
            })}
          </div>
          <Link to={`/post/view/${item.id}`}>
            <p
              className={`${
                type === 'wide'
                  ? 'text-[40px] md:text-[50px] tracking-[0.4px] md:tracking-[0.5px] leading-[46px] md:leading-[56px]'
                  : 'text-[24px] md:text-[32px] tracking-[0.2px] md:tracking-[0.32px] truncate-3 leading-[28px] md:leading-[36px]'
              } text-white font-medium font-robotoCondensed mt-[10px]`}
            >
              {item.title}
            </p>
          </Link>
          <p className={'text-[14px] font-roboto text-white font-medium tracking-[0.21px] leading-[16px] mt-[14px]'}>
            {generateTimeAgo(item.publish_date)}
          </p>
          <div className={'flex flex-wrap justify-between w-full mt-[30px] items-center'}>
            <div className={'flex text-white flex-row items-center self-start'}>
              <div>
                <Avatar className="w-[22px] h-[22px]" src={imagePath(item.source?.icon)} />
                <MetaTag className="ml-[6px] text-[#FFFFFF]">{item?.source?.name}</MetaTag>
                <MetaTag className="ml-[6px] text-[#FFFFFF]">• {(item.author?.name).split(' ')[0]}</MetaTag>
              </div>
            </div>
            <div className={'flex items-center mt-[10px] sm:mt-0 self-end md:self-center'}>
              <ActionButtons post={item} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NavbarPostHeaderCard;
