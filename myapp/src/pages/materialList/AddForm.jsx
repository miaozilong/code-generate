import {Checkbox, Form, Input, message, Modal, Select} from 'antd';
import React, {useState} from 'react';
import {useModel} from 'umi';
import {materialTableName} from '../../config'


const {Option} = Select;

const AddForm = ({onCloseModal}) => {
  const {initialState: {db}} = useModel('@@initialState');
  const [form] = Form.useForm();
  const [formConfirmLoading, setFormConfirmLoading] = useState(false);
  const handleCancel = () => {
    onCloseModal()
  }
  // 点击表单的确定按钮
  const handleOk = async () => {
    let failReason = ''
    try {
      const values = await form.validateFields()
      setFormConfirmLoading(true)
      try {
        const DB = await db;
        let material = await DB[materialTableName].toArray();
        if (material && material.some(v => v.code === values.code)) {
          failReason = '物料编码重复';
          throw Error()
        }
        DB[materialTableName].put({...values, rule_seq_last: 0,})
        message.success('保存成功')
        onCloseModal()
      } catch (e) {
        console.log(e)
        message.error('保存失败 ' + failReason);
      } finally {
        setFormConfirmLoading(false)
      }
    } catch (e) {
      // 校验不通过
      console.log(e)
    } finally {
      setFormConfirmLoading(false)
    }
  }

  return (
    <Modal
      confirmLoading={formConfirmLoading}
      title="新增规则" visible={true} onOk={handleOk} onCancel={handleCancel}>
      <Form
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="物料号"
          name="code"
          labelCol={{span: 8}}
          wrapperCol={{span: 12}}
          rules={[
            {required: true, message: '请输入物料号'},
            ({getFieldValue}) => ({
              validator(rule, value) {
                if (!/^\w+$/.test(value)) {
                  return Promise.reject(new Error('由数字、英文或者下划线组成'));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input placeholder={'请输入物料号'}/>
        </Form.Item>

        <Form.Item
          label="规则设定"
          name="code"
          labelCol={{span: 8}}
          wrapperCol={{span: 12}}
          style={{marginBottom: 0}}
        >
        </Form.Item>
        <Form.Item style={{marginBottom: 0}}>
          <Form.Item name="rule_serial_check" valuePropName="checked"
                     style={{
                       display: 'inline-block', width: 178,
                       textAlign: 'right'
                     }}
                     initialValue={true}
          >
            <Checkbox disabled>产品系列</Checkbox>
          </Form.Item>
          <Form.Item
            name="rule_serial"
            rules={[
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (!value && getFieldValue('rule_serial_check')) {
                    return Promise.reject(new Error('勾选产品系列后必填'));
                  }
                  return Promise.resolve();
                },
              }),
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (!/^\w+$/.test(value)) {
                    return Promise.reject(new Error('由数字、英文或者下划线组成'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            style={{display: 'inline-block'}}
          >
            <Input placeholder={'请输入产品系列'}/>
          </Form.Item>
        </Form.Item>
        <Form.Item style={{marginBottom: 0}}>
          <Form.Item name="rule_year_check" valuePropName="checked"
                     style={{
                       display: 'inline-block', width: 178,
                       textAlign: 'right'
                     }}
                     initialValue={true}
          >
            <Checkbox>带年份 </Checkbox>
          </Form.Item>
          <Form.Item
            name="rule_year"
            rules={[
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (!value && getFieldValue('rule_year_check')) {
                    return Promise.reject(new Error('勾选带年份后必填'));
                  }
                  return Promise.resolve();
                },
              }),
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (value === 'YYYY' || value === 'YY') {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('只支持YYYY和YY两种格式'));
                },
              })
            ]}
            initialValue={'YY'}
            style={{display: 'inline-block'}}
          >
            <Input placeholder={'请输入年份'}/>
          </Form.Item>
        </Form.Item>
        <Form.Item style={{marginBottom: 0}}>
          <Form.Item name="rule_month_check" valuePropName="checked"
                     style={{
                       display: 'inline-block', width: 178,
                       textAlign: 'right'
                     }}
                     initialValue={true}
          >
            <Checkbox>带月份 </Checkbox>
          </Form.Item>
          <Form.Item
            name="rule_month"
            rules={[
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (!value && getFieldValue('rule_month_check')) {
                    return Promise.reject(new Error('勾选带月份后必填'));
                  }
                  return Promise.resolve();
                },
              }),
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (value === 'MM' || value === 'M') {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('只支持MM和M两种格式'));
                },
              })
            ]}
            initialValue={'MM'}
            style={{display: 'inline-block'}}
          >
            <Input placeholder={'请输入月份'}/>
          </Form.Item>
        </Form.Item>
        <Form.Item style={{marginBottom: 0}}>
          <Form.Item name="rule_day_check" valuePropName="checked"
                     style={{
                       display: 'inline-block', width: 178,
                       textAlign: 'right'
                     }}
                     initialValue={true}
          >
            <Checkbox>带日期 </Checkbox>
          </Form.Item>
          <Form.Item
            name="rule_day"
            rules={[
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (!value && getFieldValue('rule_day_check')) {
                    return Promise.reject(new Error('勾选带日期后必填'));
                  }
                  return Promise.resolve();
                },
              }),
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (value === 'DD' || value === 'D') {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('只支持DD和D两种格式'));
                },
              })
            ]}
            initialValue={'DD'}
            style={{display: 'inline-block'}}
          >
            <Input placeholder={'请输入日期'}/>
          </Form.Item>
        </Form.Item>
        <Form.Item style={{marginBottom: 0}}>
          <Form.Item name="rule_seq_count_check" valuePropName="checked"
                     initialValue={true}
                     style={{
                       display: 'inline-block', width: 178,
                       textAlign: 'right'
                     }}
          >
            <Checkbox disabled>流水号 </Checkbox>
          </Form.Item>
          <Form.Item
            name="rule_seq_count"
            initialValue={3}
            style={{display: 'inline-block'}}
          >
            <Select>
              <Option value={1}>1位数</Option>
              <Option value={2}>2位数</Option>
              <Option value={3}>3位数</Option>
              <Option value={4}>4位数</Option>
              <Option value={5}>5位数</Option>
              <Option value={6}>6位数</Option>
              <Option value={7}>7位数</Option>
              <Option value={8}>8位数</Option>
              <Option value={9}>9位数</Option>
            </Select>
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddForm;
