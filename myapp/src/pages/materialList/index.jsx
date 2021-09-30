import {Button, Form, Input, Space, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {useModel} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import AddForm from "./AddForm";
import GenerateNumberModal from "./GenerateNumberModal";
import {materialTableName} from '../../config'

const TableList = () => {
  const {initialState: {db}} = useModel('@@initialState');
  const [form] = Form.useForm();
    const [addModalShow, setAddModalShow] = useState(false);
    const [generateModalShow, setGenerateModalShow] = useState(false);
    const [formConfirmLoading, setFormConfirmLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [pendGenerateMaterial, setPendGenerateMaterial] = useState('');

    useEffect(() => {
      loadData()
    }, []);

  const loadData = async (code) => {
    setTableLoading(true)
    const DB = await db;
    let material = []
    if (code) {
      material = await DB[materialTableName].orderBy('id').desc().filter(v => _.includes(v.code, code)).toArray();
    } else {
      material = await DB[materialTableName].orderBy('id').desc().toArray();
    }
    material = material.map(v => ({key: v.code, ...v}))
    setTableData(material)
    setTableLoading(false)
  }

  const onFinish = ({code}) => {
    loadData(code)
  };


  const onClickAddBtn = () => {
    setAddModalShow(true)
  }
  const onCloseAddModal = () => {
    setAddModalShow(false)
    loadData()
  }
    const onCloseGenerateModal = () => {
      setGenerateModalShow(false)
      loadData()
    }

    // 点击生成按钮
    const onClickGenerate = data => {
      setPendGenerateMaterial(data);
      setGenerateModalShow(true)
    }

  const onClickReset = () => {
    let emptyCode = '';
    form.setFieldsValue({
      code: emptyCode
    })
    loadData(emptyCode)
  }

    const columns = [
      {
        title: '物料号',
        key: 'code',
        render: data => <>{data.code}</>
      },
      {
        title: '规则',
        key: 'rule',
        render: data => {
          let ret = '';
          if (data.rule_serial_check) {
            ret = ret.concat(data.rule_serial)
          }
          if (data.rule_year_check) {
            ret = ret.concat(data.rule_year)
          }
          if (data.rule_month_check) {
            ret = ret.concat(data.rule_month)
          }
          if (data.rule_day_check) {
            ret = ret.concat(data.rule_day)
          }
          ret = ret.concat('n'.repeat(data.rule_seq_count));
          return ret
        },
      },
      {
        title: '已生成数量',
        key: 'rule_seq_last',
        align: 'right',
        render: data => <>{data.rule_seq_last}</>
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (data) => (
          <a onClick={() => onClickGenerate(data)}>生成</a>
        ),
      },
    ];

    return (
      <PageContainer>
        <Space style={{width: '100%'}} direction="vertical" size={'large'}>
          <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            <Form.Item
              name="code"
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
                onClick={onClickReset}
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
          <Table loading={tableLoading} columns={columns} dataSource={tableData} pagination={false}/>
        </Space>
        {
          addModalShow && (<AddForm onCloseModal={onCloseAddModal}></AddForm>)
        }
        {
          generateModalShow && (<GenerateNumberModal material={pendGenerateMaterial}
                                                     onCloseModal={onCloseGenerateModal}></GenerateNumberModal>)
        }
      </PageContainer>
    );
  }
;

export default TableList;
