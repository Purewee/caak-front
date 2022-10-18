import React, { useEffect, useState } from 'react';
import { message, Modal, Radio, List, Button } from 'antd';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthContext';

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

  useEffect(() => {
    setTypeId(reportTypes[0]?.id);
  }, [reportTypes]);

  return (
    <Modal
      visible
      width={480}
      confirmLoading={sending || loading}
      bodyStyle={{ padding: 0 }}
      closable={false}
      footer={false}
      title={<p className="text-[26px] font-condensed font-bold leading-[32px]">Мэдээг репортлох</p>}
    >
      <div>
        <List
          grid={{ column: 2, gutter: 0 }}
          style={{ padding: 20 }}
          dataSource={reportTypes}
          renderItem={(x) => {
            return (
              <List.Item key={x.id}>
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
              </List.Item>
            );
          }}
        />
        <div className="border-t py-[18px] flex flex-row items-center justify-end pr-[24px]">
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
