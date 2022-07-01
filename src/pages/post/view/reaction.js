import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import LoveIcon from '../../../assets/images/fi-rs-react-love.png';
import AngerIcon from '../../../assets/images/fi-rs-react-anger.svg';
import CryIcon from '../../../assets/images/fi-rs-react-cry.svg';
import HahaIcon from '../../../assets/images/fi-rs-react-haha.svg';
import WowIcon from '../../../assets/images/fi-rs-react-wow.svg';
import { ADD_REACTION, REACTIONS } from './_gql';
import { Button } from 'antd';

export default function Reaction({ articleId }) {
  const { data, loading: fetching } = useQuery(REACTIONS, { variables: { articleId } });
  const [add, { loading }] = useMutation(ADD_REACTION, { variables: { articleId } });
  const ACTIONS = [
    { action: 'like', icon: LoveIcon },
    { action: 'anger', icon: AngerIcon },
    { action: 'cry', icon: CryIcon },
    { action: 'haha', icon: HahaIcon },
    { action: 'wow', icon: WowIcon },
  ];

  const reactions = data?.article?.reactions;

  return (
    <div className="max-w-[760px] w-full flex flex-col items-center">
      <p className="text-[#111111] text-[18px] font-bold leading-[21px] my-[36px] max-w-[190px] md:max-w-full md:mt-[50px]">
        ЭНЭ МЭДЭЭНД ӨГӨХ ТАНЫ СЭТГЭГДЭЛ?
      </p>
      <div className="flex flex-row items-center gap-[7px] md:gap-[24px] mt-[14px]">
        {ACTIONS.map((x, idx) => (
          <div className="flex flex-col items-center">
            <div className="font-bold mb-[20px]">{reactions?.nodes.filter((r) => r.action === x.action).length}</div>
            <Button
              loading={loading}
              shape="circle"
              type="link"
              key={idx}
              onClick={() => add({ variables: { action: x.action } })}
            >
              <span className="rounded-full border p-[12px]">
                <img className="w-[38px]" src={x.icon} alt={x.action} />
              </span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
