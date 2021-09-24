import {Button, Form, Input, Space, Table, Tag} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import Dexie from 'dexie';

const TableList = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Finish:', values);
  };
  const onClickAdd = () => {
    console.log('点击新增按钮');
    alert('add')
    var db = new Dexie('hellodb');
    db.version(1).stores({
      tasks: '++id,date,description,done'
    });

    async function test() {
      var id = await db.tasks.put({date: Date.now(), description: 'Test Dexie', done: 0});
      console.log("Got id " + id);
      // Now lets add a bunch of tasks
      await db.tasks.bulkPut([
        {date: Date.now(), description: 'Test Dexie bulkPut()', done: 1},
        {date: Date.now(), description: 'Finish testing Dexie bulkPut()', done: 1}
      ]);
      // Ok, so let's query it

      var tasks = await db.tasks.where('done').above(0).toArray();
      console.log("Completed tasks: " + JSON.stringify(tasks, 0, 2));

      // Ok, so let's complete the 'Test Dexie' task.
      await db.tasks
        .where('description')
        .startsWithIgnoreCase('test dexi')
        .modify({done: 1});

      console.log ("All tasks should be completed now.");
      console.log ("Now let's delete all old tasks:");

      // And let's remove all old tasks:
      await db.tasks
        .where('date')
        .below(Date.now())
        .delete();

      console.log ("Done.");
    }

    test().catch (err => {
      console.error ("Uh oh! " + err.stack);
    });
  };


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
              onClick={onClickAdd}
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
