import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
  font-roboto
  text-[18px]
  text-[#555555]
`;

export const Title = tw.h1`
  text-[#111111] text-[21px] md:text-[34px] md:leading-[48px] mt-[20px] font-merri
`;

export const BlockTitle = tw.h2`
  text-[#111111] text-[20px] md:text-[26px] font-bold md:font-semibold mb-[10px] md:mb-[50px] w-full
`;

export const Paragraph = tw.p`
  text-[#303030] md:text-[#555555] text-[18px] md:leading-[36px] tracking-[0.54px] md:pt-[30px] font-literata
`;

export const HashTag = tw.span`
  text-[#FF6600] text-[13px] font-medium
`;

export const MetaTag = tw.span`
  text-[#555555] text-[14px] ml-[12px] leading-[16px]
`;
