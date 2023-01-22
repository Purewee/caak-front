import React from 'react';
import { Avatar, Modal } from 'antd';

const data = [
  {
    name: 'hvmvvn humuus',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/IU_posing_for_Marie_Claire_Korea_March_2022_issue_03.jpg',
  },
  {
    name: 'hvmvvn humuus',
    image: '',
  },
  {
    name: 'hvmvvn humuus',
    image: '',
  },
  {
    name: 'hvmvvn humuus',
    image: '',
  },
  {
    name: 'hvmvvn humuus',
    image: '',
  },
  {
    name: 'hvmvvn humuus',
    image: '',
  },
  {
    name: 'hvmvvn humuus',
    image: '',
  },
  {
    name: 'hvmvvn humuus',
    image: '',
  },
  {
    name: 'hvmvvn humuus',
    image: '',
  },
  {
    name: 'hvmvvn humuus',
    image: '',
  },
];

export default function FollowsModal({ toggle, follows }) {
  return (
    <Modal
      visible
      width={540}
      title={<span className="text-[26px] font-condensed font-bold leading-[30px]">Дагаж буй</span>}
      bodyStyle={{ padding: 0 }}
      afterClose={toggle}
      footer={false}
      closeIcon={<span onClick={toggle} className="icon-fi-rs-close text-[18px] text-[#909090]" />}
    >
      <div>
        <div className="bg-[#FBFAFB] h-[76px] p-[16px]">
          <input className="w-full h-full border border-[#D4D8D8] rounded-[2px]" />
        </div>
        <div className="w-full h-[400px] bg-white overflow-y-scroll flex flex-col gap-y-[16px] pl-[20px] pr-[14px] pb-[16px]">
          {/* {data.map((data, index) => {
            return (
              <div className="flex flex-row items-center" key={index}>
                <Avatar src={data.image} className="w-[54px] h-[54px]" />
                <p className="ml-[14px] text-[16px] leading-[19px] text-[#111111] font-roboto">{data.name}</p>
              </div>
            );
          })} */}
        </div>
      </div>
    </Modal>
  );
}
