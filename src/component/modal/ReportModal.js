import React, { useEffect, useState } from 'react';
import { message, Modal, Radio, List, Button } from 'antd';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthContext';
import useMediaQuery from '../navigation/useMediaQuery';

const REPORT_TYPES = gql`
  query getReportTypes {
    reportTypes {
      id
      name
      description
    }
  }
`;

const SEND_REPORT = gql`
  mutation SendReport($articleId: ID!, $typeId: ID!) {
    reportArticle(input: { articleId: $articleId, reportTypeId: $typeId })
  }
`;
export default function ReportModal({ post, toggle }) {
  const [typeId, setTypeId] = useState();
  const { data, loading } = useQuery(REPORT_TYPES);
  const { isAuth, openModal } = useAuth();
  const [sendReport, { loading: sending }] = useMutation(SEND_REPORT, { variables: { articleId: post.id } });
  const reportTypes = data?.reportTypes || [];

  const isMobile = useMediaQuery('screen and (max-width: 600px)');

  useEffect(() => {
    setTypeId(reportTypes[0]?.id);
  }, [reportTypes]);

  return (
    <Modal
      width={600}
      visible
      confirmLoading={sending || loading}
      bodyStyle={{ padding: 0 }}
      closable={false}
      footer={false}
      title={<p className="text-[26px] font-condensed font-bold leading-[32px] border-b-0">Мэдээг репортлох</p>}
    >
      <div>
        <List
          grid={{ column: isMobile ? 1 : 2, gutter: 0 }}
          style={{ paddingInline: 23 }}
          dataSource={reportTypes}
          renderItem={(x, index) => {
            return (
              <div
                className={`py-[17px] border-b border-[#D4D8D8] ${
                  index === 1 && 'sm:border-l border-[#D4D8D8] sm:pl-[14px]'
                } ${index === 3 && 'sm:border-l border-[#D4D8D8] sm:pl-[14px]'} ${
                  index === 5 && 'sm:border-l border-[#D4D8D8] sm:pl-[14px]'
                }`}
                key={x.id}
              >
                <Radio
                  id={x.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTypeId(x.id);
                    }
                  }}
                  value={x.id}
                  checked={typeId === x.id}
                  name="report"
                />
                <label className="cursor-pointer font-roboto text-[15px] leading-[20px] text-[#111111]" htmlFor={x.id}>
                  {x.name}
                </label>
              </div>
            );
          }}
        />
        <div className="py-[18px] flex flex-row items-center justify-end pr-[24px]">
          <Button
            onClick={toggle}
            className="w-[76px] h-[34px] border border-[#D4D8D8] hover:border-[#D4D8D8] rounded-[4px] text-[15px] text-caak-black hover:text-caak-black font-medium font-roboto"
          >
            Болих
          </Button>
          <Button
            onClick={() => {
              if (isAuth) {
                sendReport({ variables: { typeId } }).then(() => {
                  message.success('Таны хүсэлтийг хүлээн авлаа.');
                  toggle();
                });
              } else {
                openModal('login');
              }
            }}
            className="w-[82px] h-[34px] rounded-[4px] text-[15px] font-medium font-roboto ml-[10px]"
            type="primary"
          >
            Илгээх
          </Button>
        </div>
      </div>
    </Modal>
  );
}
