import {Button, Form, Input, Space, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {history, useModel} from 'umi';
import {fileTableName, historyTableName} from '@/config'
import _ from 'lodash';
import xlsx, {utils} from 'xlsx';

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
    let fileData;
    if (code) {
      fileData = await DB[fileTableName].filter(v => _.includes(v.material_code, code)).toArray();
    } else {
      fileData = await DB[fileTableName].toArray();
    }
    fileData = fileData.map(v => ({key: v.file_name, ...v}))
    setTableData(fileData)
    setTableLoading(false)
  }

  const onClickDownload = async (data) => {
    var filename = data.file_name + ".xlsx";
    const DB = await db;
    let historyGenerateData = await DB[historyTableName].where('file_name').equals(data.file_name).toArray();
    historyGenerateData = historyGenerateData.map(v => ({物料编号: v.material_code, 规则编号: v.rule_code}))
    var ws = utils.json_to_sheet(historyGenerateData);
    var ws_name = "SheetJS";
    if (typeof console !== 'undefined') console.log(new Date());
    var wb = utils.book_new();
    /* add worksheet to workbook */
    utils.book_append_sheet(wb, ws, ws_name);
    /* write workbook */
    if (typeof console !== 'undefined') console.log(new Date());
    xlsx.writeFile(wb, filename);
    if (typeof console !== 'undefined') console.log(new Date());
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
      render: data => <>{`${data.file_name}.xlsx`}</>
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
          <Table loading={tableLoading} columns={columns} dataSource={tableData} pagination={false}/>
        </Space>
      </PageContainer>
    );
  }
;

export default TableList;
