import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_REACTION, UPDATE_REACTION } from './_gql';
import { Button, Spin, message } from 'antd';
import * as love from '../../../assets/json/love-js.json';
import * as angry from '../../../assets/json/anry-js.json';
import * as cry from '../../../assets/json/cry-js.json';
import * as haha from '../../../assets/json/haha-js.json';
import * as wow from '../../../assets/json/wow-js.json';
import Lottie from 'react-lottie';
import { useAuth } from '../../../context/AuthContext';

export default function Reaction({ reactions, articleId, left, refetch, fetching }) {
  const [active, setActive] = useState(true);
  const { isAuth } = useAuth();
  const [add, { loading }] = useMutation(ADD_REACTION, { variables: { articleId } });
  const [update, { loading: updating }] = useMutation(UPDATE_REACTION);
  const ACTIONS = [
    { action: 'like', icon: love },
    { action: 'haha', icon: haha },
    { action: 'wow', icon: wow },
    { action: 'cry', icon: cry },
    { action: 'angry', icon: angry },
  ];

  return (
    <Spin className={`max-w-[760px] w-full flex flex-col items-center`} spinning={loading || fetching}>
      <p
        className={`text-[#111111] text-[18px] font-bold leading-[21px] my-[36px] text-center px-[70px] md:px-0 md:mt-[50px] ${
          left && 'hidden'
        }`}
      >
        ЭНЭ МЭДЭЭНД ӨГӨХ ТАНЫ СЭТГЭГДЭЛ?
      </p>
      <div
        className={`flex flex-row items-center ${left ? 'gap-[8px] h-[46px]' : 'gap-[7px] md:gap-[24px] mt-[14px]'}`}
      >
        {ACTIONS.map((x, idx) => (
          <div key={idx} className={`flex flex-col items-center`}>
            <div className={`font-bold ${left ? 'hidden' : 'mb-[20px]'}`}>
              {reactions?.nodes.filter((r) => r.action === x.action).length}
            </div>
            <Button
              disabled={loading || updating || !active}
              shape="circle"
              type="link"
              key={idx}
              onClick={() => {
                if (isAuth) {
                  add({ variables: { action: x.action } }).then(() => {
                    refetch().then(() => {
                      message.success('Мэдээг үнэлсэнд баярлалаа.').then(() => {
                        setActive(false);
                      });
                    });
                  });
                } else {
                  const prevId = localStorage.getItem(`r_${articleId}`) || false;
                  if (prevId) {
                    update({ variables: { action: x.action, id: prevId } }).then((res) => {
                      localStorage.setItem(`r_${articleId}`, res?.data?.reaction?.id);
                      refetch().then(() => {
                        message.success('Мэдээг үнэлсэнд баярлалаа.').then(() => {
                          setActive(false);
                        });
                      });
                    });
                  } else {
                    add({ variables: { action: x.action } }).then((res) => {
                      localStorage.setItem(`r_${articleId}`, res?.data?.reaction?.id);
                      refetch().then(() => {
                        message.success('Мэдээг үнэлсэнд баярлалаа.').then(() => {
                          setActive(false);
                        });
                      });
                    });
                  }
                }
              }}
            >
              <span className={`${!left && 'rounded-full border p-[12px]'}`}>
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
                  isStopped={loading || updating}
                  isPaused={loading || updating}
                />
              </span>
            </Button>
          </div>
        ))}
      </div>
    </Spin>
  );
}
