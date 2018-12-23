import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'

export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  //dashboard
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  //customers
  {
    path: '/customers',
    component: Layout,
    name: 'Customers',
    alwaysShow: true,
    meta: {
      title: '会员管理',
      icon: 'person'
    },
    children: [{
      path: 'cus-info',
      name: 'CusInfo',
      component: () => import('@/views/customers/CusInfo'),
      meta: {
        title: '会员资料',
        icon: 'people_info_management'
      }
    }]
  },
  //staff
  {
    path: '/staff',
    component: Layout,
    name: 'Staff',
    alwaysShow: true,
    meta: {
      title: '员工管理',
      icon: 'staff'
    },
    children: [{
        path: 'staff-info',
        name: 'StaffInfo',
        component: () => import('@/views/staff/StaffInfo'),
        meta: {
          title: '员工资料',
          icon: 'personal_data'
        }
      },
      {
        path: 'staff-salary',
        name: 'Staff-salary',
        component: () => import('@/views/staff/salary'),
        meta: {
          title: '员工工资',
          icon: 'money'
        }
      }
    ]
  },
  //order
  {
    path: '/order',
    component: Layout,
    name: 'Order',
    alwaysShow: true,
    meta: {
      title: '订单管理',
      icon: 'orders'
    },
    children: [{
        path: 'create-order',
        name: 'CreateOrder',
        component: () => import('@/views/order/CreateOrder'),
        meta: {
          title: '创建订单',
          icon: 'my_order'
        }
      },
      {
        path: 'retrieve-order',
        name: 'RetrieveOrder',
        component: () => import('@/views/order/RetrieveOrder'),
        meta: {
          title: '历史订单',
          icon: 'find'
        }
      }
    ]
  },
  //storage
  {
    path: '/storage',
    component: Layout,
    name: 'Storage',
    alwaysShow: true,
    meta: {
      title: '库存管理',
      icon: 'storage'
    },
    children: [{
        path: 'check-storage',
        name: 'CheckStorage',
        component: () => import('@/views/storage/CheckStorage'),
        meta: {
          title: '库存盘点',
          icon: 'pandian'
        }
      },
      {
        path: 'in-storage',
        name: 'InStorage',
        component: () => import('@/views/storage/InStorage'),
        meta: {
          title: '入库管理',
          icon: 'in_storage'
        }
      },
      {
        path: 'fitting-manage',
        name: 'FittingManage',
        component: () => import('@/views/storage/FittingManage'),
        meta: {
          title: '配件信息',
          icon: 'fitting'
        }
      }
    ]
  },
  //payment
  {
    path: '/payment',
    component: Layout,
    name: 'Payment',
    alwaysShow: true,
    meta: {
      title: '财务支出',
      icon: 'payment'
    },
    children: [
      {
        path: 'pay-salary',
        name: 'salaryPay',
        component: () => import('@/views/payment/MonthlyPay'),
        meta: {
          title: '每月支出',
          icon: 'salary'
        }
      },
      {
        path: 'pay-storage',
        name: 'StoragePay',
        component: () => import('@/views/payment/StoragePay'),
        meta: {
          title: '采购支出',
          icon: 'money'
        }
      }
    ]
  },
  //report
  {
    path: '/report',
    component: Layout,
    name: 'Report',
    alwaysShow: true,
    meta: {
      title: '报表统计',
      icon: 'report'
    },
    children: [{
        path: 'report-finance',
        name: 'ReportFinance',
        component: () => import('@/views/report/Finance'),
        meta: {
          title: '收支情况',
          icon: 'finance'
        }
      },
      {
        path: 'report-order',
        name: 'ReportOrder',
        component: () => import('@/views/report/Order'),
        meta: {
          title: '业务统计',
          icon: 'orders'
        }
      },
      {
        path: 'report-customers',
        name: 'ReportCustomers',
        component: () => import('@/views/report/Customers'),
        meta: {
          title: '会员分析',
          icon: 'vip'
        }
      },
      {
        path: 'report-salary',
        name: 'ReportSalary',
        component: () => import('@/views/report/Salary'),
        meta: {
          title: '工资统计',
          icon: 'salary'
        }
      }
    ]
  },

  {
    path: '/mall',
    component: Layout,
    name: 'Mall',
    alwaysShow: true,
    meta: {
      title: '积分商城',
      icon: 'point'
    },
    children: [{
        path: 'point-mall',
        name: 'PointMall',
        component: () => import('@/views/pointMall/PointMall'),
        meta: {
          title: '积分兑换',
          icon: 'cart'
        }
      },
      {
        path: 'reward-manage',
        name: 'RewardManage',
        component: () => import('@/views/pointMall/RewardManage'),
        meta: {
          title: '奖品管理',
          icon: 'setting'
        }
      }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
