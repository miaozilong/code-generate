import {Button, Form, Input, Select, Space, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {history, useModel} from 'umi';
import {fileTableName} from '../../config'
import _ from 'lodash';

const {Option} = Select;

const TableList = () => {
  const {initialState: {db}} = useModel('@@initialState');
  let code = history.location.query.code;
  const [form] = Form.useForm();
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    loadData(code)
  }, []);

  const loadData = async (code) => {
    setTableLoading(true)
    const DB = await db;
    let fileData = [];
    if (code) {
      fileData = await DB[fileTableName].filter(v => _.includes(v.material_code, code)).toArray();
    } else {
      fileData = await DB[fileTableName].toArray();
    }
    fileData = fileData.map(v => ({key: v.file_name, ...v}))
    setTableData(fileData)
    setTableLoading(false)
  }

  const onClickDownload = (data) => {


  }

  const onFinish = ({code}) => {
    loadData(code)
  };

  const onClickReset = () => {
    form.setFieldsValue({
      code: ''
    })
  }

  // todo 文件名后缀
  const columns = [
    {
      title: '文件名',
      key: 'file_name',
      render: data => <>{data.file_name}</>
    },
    {
      title: '物料号',
      key: 'material_code',
      render: data => <>{data.material_code}</>
    },
    {
      title: '生成时间',
      key: 'generate_time',
      align: 'center',
      render: data => <>{data.generate_time}</>
    },
    {
      title: '数量',
      key: 'generate_count',
      align: 'right',
        render: data => <>{data.generate_count}</>
      },
      {
        title: '操作',
        key: 'action',
        render: (data) => (
          <a onClick={() => onClickDownload(data)}>下载</a>
        ),
      },
    ];

    return (
      <PageContainer>
        <Space direction="vertical" size={'large'}>
          <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            <Form.Item name="code" initialValue={code}>
              <Input placeholder="请输入物料号"/>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                搜索
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={onClickReset}
              >
                重置
              </Button>
            </Form.Item>
          </Form>
          <Table columns={columns} dataSource={tableData} pagination={false}/>
        </Space>
      </PageContainer>
    );
  }
;

export default TableList;
