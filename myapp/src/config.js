export const materialTableName = 'material';
export const historyTableName = 'generate_history';
export const fileTableName = 'generate_history_file';

export const serialData = [
  {type: '控制器', serial: [{name: 'MC', desc: 'RP2 控制器'}]},
  {
    type: '驱动器', serial: [
      {name: 'D4A', desc: 'EC2A 4轴驱动'},
      {name: 'D6A', desc: 'EC2A 6轴驱动'},
      {name: 'D6B', desc: 'EC2B 6轴驱动'},
      {name: 'D6C', desc: 'EC2C 6轴驱动'},
      {name: 'D4M', desc: 'EC2M 4轴驱动'},
      {name: 'D6M', desc: 'EC2M 6轴驱动'},
      {name: 'D7M', desc: 'EC2M 7轴驱动'},
      {name: 'D8M', desc: 'EC2M 8轴驱动'},
    ]
  },
  {
    type: '协作产品部件', serial: [
      {name: 'E14A', desc: 'ECR14关节单编码器板'},
      {name: 'E14B', desc: 'ECR14关节双编码器板'},
      {name: 'E17A', desc: 'ECR17关节单编码器板'},
      {name: 'E17B', desc: 'ECR17关节双编码器板'},
      {name: 'E20A', desc: 'ECR20关节单编码器板'},
      {name: 'E20B', desc: 'ECR20关节双编码器板'},
      {name: 'E25A', desc: 'ECR25关节单编码器板'},
      {name: 'E25B', desc: 'ECR25关节双编码器板'},
      {name: 'E32A', desc: 'ECR32关节双编码器板'},
      {name: 'E32B', desc: 'ECR32关节双编码器板'},
      {name: 'EB', desc: 'ECR制动板板'},
      {name: 'ET', desc: 'ECR末端接口板'},
    ]
  },
  {
    type: '电气零部件', serial: [
      {name: 'SB', desc: '安全板'},
      {name: 'TP', desc: '示教器'},
      {name: 'AIO', desc: '工业AIO'},
      {name: 'DIO', desc: '工业DIO'},
      {name: 'EIO', desc: '协作IO'},
      {name: 'PD', desc: '电源管理板'},
      {name: 'PB', desc: '电柜集成面板'},
    ]
  },
]
