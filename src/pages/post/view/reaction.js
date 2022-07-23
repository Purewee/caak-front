import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_REACTION, REACTIONS } from './_gql';
import { Button, Spin, message } from 'antd';
import * as love from '../../../assets/json/love-js.json';
import * as angry from '../../../assets/json/anry-js.json';
import * as cry from '../../../assets/json/cry-js.json';
import * as haha from '../../../assets/json/haha-js.json';
import * as wow from '../../../assets/json/wow-js.json';
import Lottie from 'react-lottie';

export default function Reaction({ articleId }) {
  const [active, setActive] = useState(true);
  const { data, loading: fetching, refetch } = useQuery(REACTIONS, { variables: { articleId } });
  const [add, { loading }] = useMutation(ADD_REACTION, { variables: { articleId } });
  const ACTIONS = [
    { action: 'like', icon: love },
    { action: 'haha', icon: haha },
    { action: 'wow', icon: wow },
    { action: 'cry', icon: cry },
    { action: 'angry', icon: angry },
  ];

  const reactions = data?.article?.reactions;

  return (
    <Spin className="max-w-[760px] w-full flex flex-col items-center" spinning={loading || fetching}>
      <p className="text-[#111111] text-[18px] font-bold leading-[21px] my-[36px] text-center px-[70px] md:px-0 md:mt-[50px]">
        ЭНЭ МЭДЭЭНД ӨГӨХ ТАНЫ СЭТГЭГДЭЛ?
      </p>
      <div className="flex flex-row items-center gap-[7px] md:gap-[24px] mt-[14px]">
        {ACTIONS.map((x, idx) => (
          <div key={idx} className={`flex flex-col items-center`}>
            <div className="font-bold mb-[20px]">{reactions?.nodes.filter((r) => r.action === x.action).length}</div>
            <Button
              disabled={loading || !active}
              shape="circle"
              type="link"
              key={idx}
              onClick={() =>
                add({ variables: { action: x.action } }).then(() => {
                  refetch();
                  message.success('Мэдээг үнэлсэнд баярлалаа.');
                  setActive(false);
                })
              }
            >
              <span className="rounded-full border p-[12px]">
                <Lottie
                  options={{
                    animationData: x.icon,
                    loop: true,
                    autoplay: true,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                  height={38}
                  width={38}
                  isStopped={loading}
                  isPaused={loading}
                />
              </span>
            </Button>
          </div>
        ))}
      </div>
    </Spin>
  );
}
