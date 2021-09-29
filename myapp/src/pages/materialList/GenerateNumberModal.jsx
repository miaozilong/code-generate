import {Form, Input, message, Modal, Select} from 'antd';
import React, {useState} from 'react';
import {fileTableName, historyTableName, materialTableName} from '../../config'
import moment from 'moment';
import _ from 'lodash';
import {history, useModel} from 'umi';

const {Option} = Select;

const GenerateNumberModal = ({onCloseModal, material}) => {
  const {initialState: {db}} = useModel('@@initialState');
  const [form] = Form.useForm();
  const [formConfirmLoading, setFormConfirmLoading] = useState(false);

  const handleCancel = () => {
    onCloseModal()
  }
  // 点击表单的确定按钮
  const handleOk = async () => {
    const DB = await db;
    let failReason = ''
    try {
      const values = await form.validateFields()
      setFormConfirmLoading(true)
      let now = moment()
      try {
        const leftCont = getMaxCodeLeft(material);
        if (leftCont < values.count) {
          if (leftCont === 0) {
            failReason = `编码已经用完`;
          } else {
            failReason = `仅剩${leftCont}个编码`;
          }
          throw new Error();
        }
        let fileName = now.format('YYYYMMDDHHmmss');
        let generateValue = [];
        let generateCount = _.toNumber(values.count);
        for (let i = 1; i <= generateCount; i++) {
          generateValue.push({
            file_name: fileName,
            material_code: material.code,
            rule_code: getCode(material, i),
          })
        }
        await DB[materialTableName].where('code').equals(material.code)
          .modify({rule_seq_last: material.rule_seq_last + generateCount});

        function getCode(material, seq) {
          let ret = '';
          if (material.rule_serial_check) {
            ret = ret.concat(material.rule_serial)
          }
          if (material.rule_year_check) {
            ret = ret.concat(now.format(material.rule_year));
          }
          if (material.rule_month_check) {
            ret = ret.concat(now.format(material.rule_month));
          }
          if (material.rule_day_check) {
            ret = ret.concat(now.format(material.rule_day));
          }
          const seqValue = _.padStart(material.rule_seq_last + seq, material.rule_seq_count, '0')
          ret = ret.concat(seqValue);
          return ret
        }

        function getMaxCodeLeft(material) {
          return Math.pow(10, material.rule_seq_count) - 1 - material.rule_seq_last
        }
        await DB[historyTableName].bulkPut(generateValue)
        let fileData = {
          material_code: material.code,
          file_name: fileName,
          generate_time: now.format('YYYY/MM/DD HH:mm:ss'),
          generate_count: generateCount
        }
        await DB[fileTableName].put(fileData)
        onCloseModal()
        message.success('生成成功')
        history.push({
          pathname: '/seqExport',
          query: {
            code: material.code,
          },
        });
      } catch (e) {
        console.log(e)
        message.error('生成失败 ' + failReason);
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
      title="生成数量" visible={true} onOk={handleOk} onCancel={handleCancel}>
      <Form
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="物料号"
          name="code"
          labelCol={{span: 8}}
          wrapperCol={{span: 12}}
          rules={[{required: true, message: '请输入物料号'}]}
          initialValue={material.code}
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item
          label="生成数量"
          name="count"
          rules={[
            {required: true, message: '请输入生成数量'},
            ({getFieldValue}) => ({
              validator(rule, value) {
                if ((/\d+/).test(value) && value > 0 && value < 1000) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('生成数量介于1到999'));
              },
            }),
          ]}
          initialValue={100}
          labelCol={{span: 8}}
          wrapperCol={{span: 12}}
        >
          <Input></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GenerateNumberModal;
