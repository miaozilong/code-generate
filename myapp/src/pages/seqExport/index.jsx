import {Button, Form, Input, Select, Space, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {materialTableName, historyTableName, fileTableName} from '../../config'
import yuxStorage from 'yux-storage';

const {Option} = Select;

const TableList = () => {
    const [form] = Form.useForm();
    const [tableLoading, setTableLoading] = useState(false);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
      loadData()
    }, []);

    const loadData = async () => {
      setTableLoading(true)
      let fileData = await yuxStorage.getItem(fileTableName) || [];
      fileData = fileData.map(v => ({key: v.file_name, ...v}))
      setTableData(fileData)
      setTableLoading(false)
    }

    const onClickDownload = (data) => {
      console.log(data)
      debugger
    }

    const onFinish = (values) => {
      loadData()
    };

    const columns = [
      {
        title: '文件名',
        key: 'file_name',
        render: data => <>{data.file_name}</>
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
            <Form.Item name="materialCode">
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
                htmlType="reset"
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
