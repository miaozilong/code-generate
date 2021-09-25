import {Button, Form, Input, Space, Table, Tag} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import yuxStorage from 'yux-storage';


const TableList = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Finish:', values);
  };

  const onClickAddBtn=()=>{
    alert('hello world')
    yuxStorage.setItem('key','hello world 2').then(async ()=>{
      let item =await yuxStorage.getItem('key');
      alert(item)
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <PageContainer>
      <Space direction="vertical" size={'large'}>
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
          <Form.Item
            name="materialCode"
          >
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
          <Form.Item>
            <Button
              type="link"
              onClick={onClickAddBtn}
            >
              新增
            </Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={data} pagination={false}/>
      </Space>
    </PageContainer>
  );
};

export default TableList;
