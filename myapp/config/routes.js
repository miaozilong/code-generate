export default [
  // {
  //   path: '/user',
  //   layout: false,
  //   routes: [
  //     {
  //       path: '/user',
  //       routes: [
  //         {
  //           name: 'login',
  //           path: '/user/login',
  //           component: './user/Login',
  //         },
  //       ],
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  /*
  物料列表      materialList
  新增规则      addRule     <RadarChartOutlined />
  物料序列号导出历史   seqExport   <ExportOutlined />
   */
  {
    name: '物料列表',
    icon: 'table',
    path: '/materialList',
    component: './materialList',
  },
  {
    name: '新增规则',
    icon: 'edit',
    path: '/addRule',
    component: './addRule',
  },
  {
    name: '物料序列号导出历史',
    icon: 'smile',
    path: '/seqExport',
    component: './seqExport',
  },

  {
    path: '/',
    redirect: '/materialList',
  },
  {
    component: './404',
  },
];
