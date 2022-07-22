import React, { useEffect, useState } from 'react';
import { message, Modal, Radio, List } from 'antd';
import { gql, useQuery, useMutation } from '@apollo/client';

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
  const [sendReport, { loading: sending }] = useMutation(SEND_REPORT, { variables: { articleId: post.id } });
  const reportTypes = data?.reportTypes || [];

  useEffect(() => {
    setTypeId(reportTypes[0]?.id);
  }, [reportTypes]);

  return (
    <Modal
      visible
      width={600}
      onCancel={toggle}
      afterClose={toggle}
      confirmLoading={sending || loading}
      onOk={() => {
        sendReport({ variables: { typeId } }).then(() => {
          message.success('Таны хүсэлтийг хүлээн авлаа.');
          toggle();
        });
      }}
      title={<p className="text-[26px] font-condensed font-bold leading-[30px]">Мэдээг репортлох</p>}
    >
      <List
        grid={{ column: 2, gutter: 0 }}
        dataSource={reportTypes}
        renderItem={(x) => {
          return (
            <List.Item key={x.id} className="font-merri">
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
              <label className="cursor-pointer text-15px" htmlFor={x.id}>
                {x.name}
              </label>
            </List.Item>
          );
        }}
      />
    </Modal>
  );
}
