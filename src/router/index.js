import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
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
    alwaysShow:true,
    meta: { title: 'customers',icon:'person'},
    children:[
      {
        path:'cus-info',
        name:'CusInfo',
        component:()=>import ('@/views/customers/CusInfo'),
        meta:{title:'Cusinfo',icon: 'personal_data'}
      },
      {
        path:'cus-point',
        name:'CusPoint',
        component:()=>import ('@/views/customers/CusPoint'),
        meta:{title:'CusPoint',icon:'earnings'}
      },
      {
        path:'cus-info-manage',
        name:'CusInfoManage',
        component:()=>import ('@/views/customers/CusInfoManage'),
        meta:{title:'CusInfoManage ',icon:'people_info_management'}
      }
    ]
  },
  //staff
  {
    path: '/staff',
    component: Layout,
    name: 'Staff',
    alwaysShow:true,
    meta: { title: 'staff', icon: 'staff' },
    children: [
      {
        path: 'staff-info',
        name: 'StaffInfo',
        component: () => import('@/views/staff/StaffInfo'),
        meta: { title: 'StaffInfo', icon: 'personal_data' }
      },
      {
        path: 'staff-salary',
        name: 'Staff-salary',
        component: () => import('@/views/staff/salary'),
        meta :{ title: 'StaffSalary', icon: 'money'}
      }
    ]
  },
  //order
  {
    path: '/order',
    component: Layout,
    name: 'Order',
    alwaysShow:true,
    meta: { title: 'order', icon: 'orders' },
    children: [
      {
        path: 'create-order',
        name: 'CreateOrder',
        component: () => import('@/views/order/CreateOrder'),
        meta: { title: 'CreateOrder', icon: 'my_order' }
      },
      {
        path: 'retrieve-order',
        name: 'RetrieveOrder',
        component: () => import('@/views/order/RetrieveOrder'),
        meta: { title: 'RetrieveOrder', icon: 'find' }
      }
    ]
  },
  //storage
  {
    path: '/storage',
    component: Layout,
    name: 'Storage',
    alwaysShow:true,
    meta: { title: 'Storage', icon: 'storage' },
    children: [
      {
        path: 'check-storage',
        name: 'CheckStorage',
        component: () => import('@/views/Storage/CheckStorage'),
        meta: { title: 'CheckStorage', icon: 'find' }
      },
      {
        path: 'in-storage',
        name: 'InStorage',
        component: () => import('@/views/Storage/InStorage'),
        meta: { title: 'InStorage', icon: 'in_storage' }
      },
      {
        path: 'out-storage',
        name: 'OutStorage',
        component: () => import('@/views/Storage/OutStorage'),
        meta: { title: 'OutStorage', icon: 'out_storage' }
      },
      {
        path: 'warning',
        name: 'Warning',
        component: () => import('@/views/Storage/Warning'),
        meta: { title: 'Warning', icon: 'warning' }
      }
    ]
  },
  //payment
  {
    path: '/payment',
    component: Layout,
    name: 'Payment',
    alwaysShow:true,
    meta: { title: 'Payment', icon: 'payment' },
    children: [
      {
        path: 'pay-daily',
        name: 'DailyPay',
        component: () => import('@/views/payment/DailyPay'),
        meta: { title: 'DailyPay', icon: 'daily' }
      },
      {
        path: 'pay-salary',
        name: 'salaryPay',
        component: () => import('@/views/payment/SalaryPay'),
        meta: { title: 'SalaryPay', icon: 'salary' }
      },
      {
        path: 'pay-storage',
        name: 'StoragePay',
        component: () => import('@/views/payment/StoragePay'),
        meta: { title: 'StoragePay', icon: 'money' }
      }
    ]
  },
  //report
  {
    path: '/report',
    component: Layout,
    name: 'Report',
    alwaysShow:true,
    meta: { title: 'Report', icon: 'report' },
    children: [
      {
        path: 'report-finance',
        name: 'ReportFinance',
        component: () => import('@/views/report/Finance'),
        meta: { title: 'ReportFinance', icon: 'finance' }
      },
      {
        path: 'report-order',
        name: 'ReportOrder',
        component: () => import('@/views/report/Order'),
        meta: { title: 'ReportOrder', icon: 'orders' }
      },
      {
        path: 'report-customers',
        name: 'ReportCustomers',
        component: () => import('@/views/report/Customers'),
        meta: { title: 'ReportCustomers', icon: 'person' }
      },
      {
        path: 'report-salary',
        name: 'ReportSalary',
        component: () => import('@/views/report/Salary'),
        meta: { title: 'ReportSalary', icon: 'salary' }
      }
    ]
  },
  //example
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  //form
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  //nested
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
