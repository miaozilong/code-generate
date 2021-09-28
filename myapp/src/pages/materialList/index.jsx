import {Button, Form, Input, Select, Space, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import AddForm from "./AddForm";
import GenerateNumberModal from "./GenerateNumberModal";
import config from './config';
import yuxStorage from 'yux-storage';

const {Option} = Select;

const TableList = () => {
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

    const loadData = async () => {
      debugger
      setTableLoading(true)
      let material = await yuxStorage.getItem(config.materialTableName);
      if (material) {
        material = material.map(v => ({key: v.code, ...v}))
        setTableData(material)
      } else {
        setTableData([])
      }
      setTableLoading(false)
    }

    const onFinish = (values) => {
      loadData()
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

    const columns = [
      {
        title: '物料号',
        key: 'code',
        render: data => <a>{data.code}</a>
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
        render: (data) => (
          <a onClick={() => onClickGenerate(data)}>生成</a>
        ),
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
          <Table columns={columns} dataSource={tableData} pagination={false}/>
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
