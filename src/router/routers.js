import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true,
      icon: ''
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true,
      icon: ''
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: ''
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/demand',
    name: 'demand',
    meta: {
      icon: 'logo-buffer',
      title: '数据需求管理'
    },
    component: Main,
    children: [
      {
        path: 'demand_index',
        name: 'demand_index',
        meta: {
          title: '需求提交',
          icon: ''
        },
        component: () => import('@/view/demand/demand_index.vue')
      },
      {
        path: 'demand_manage',
        name: 'demand_manage',
        meta: {
          title: '需求列表',
          icon: ''
        },
        component: () => import('@/view/demand/demand_manage.vue')
      }
    ]
  },
  {
    path: '/report',
    name: 'report',
    meta: {
      icon: 'ios-stats',
      title: '报表模块'
    },
    component: Main,
    children: [
      {
        path: 'takeout',
        name: 'takeout',
        meta: {
          showAlways: true,
          title: '外卖',
          icon: ''
        },
        component: parentView,
        children: [
          {
            path: 'takeout_search',
            name: 'takeout_search',
            meta: {
              title: '外卖订单自助查询工具',
              icon: ''
            },
            component: () => import('@/view/report/takeout/search.vue')
          },
          {
            path: 'takeout_cube',
            name: 'takeout_cube',
            meta: {
              title: '外卖支付自助查询工具',
              icon: ''
            },
            component: () => import('@/view/report/takeout/cube.vue')
          },
          {
            path: 'takeout_service',
            name: 'takeout_service',
            meta: {
              title: '外卖服务自助查询工具',
              icon: ''
            },
            component: () => import('@/view/report/takeout/service.vue')
          },
          {
            path: 'family_cube',
            name: 'family_cube',
            meta: {
              title: '全家快中台自助查询工具',
              icon: ''
            },
            component: () => import('@/view/report/takeout/family_cube.vue')
          }
        ]
      },
      {
        path: 'cube',
        name: 'cube',
        meta: {
          title: '支付',
          icon: ''
        },
        component: parentView,
        children: [
          {
            path: 'pay_board',
            name: 'pay_board',
            meta: {
              title: '支付大盘',
              icon: ''
            },
            component: () => import('@/view/report/pay/board.vue')
          },
          {
            path: 'pay_cube',
            name: 'pay_cube',
            meta: {
              title: '支付自助查询工具',
              icon: ''
            },
            component: () => import('@/view/report/pay/cube.vue')
          }
        ]
      },
      {
        path: 'coupon',
        name: 'coupon',
        meta: {
          title: '券码营销',
          icon: ''
        },
        component: parentView,
        children: [
          {
            path: 'coupon_board',
            name: 'coupon_board',
            meta: {
              title: '券码核销明细报表',
              icon: ''
            },
            component: () => import('@/view/report/coupon/board.vue')
          },
          {
            path: 'coupon_active',
            name: 'coupon_active',
            meta: {
              title: '券码活动运营报表',
              icon: ''
            },
            component: () => import('@/view/report/coupon/active.vue')
          }
        ]
      },
      {
        path: 'report_task',
        name: 'report_task',
        meta: {
          title: '报表任务',
          icon: ''
        },
        component: () => import('@/view/report/task.vue')
      },
      {
        path: 'report_download',
        name: 'report_download',
        meta: {
          title: '报表下载',
          icon: ''
        },
        component: () => import('@/view/report/download.vue')
      },
      {
        path: 'report_detail',
        name: 'report_detail',
        meta: {
          title: '报表查看明细',
          icon: ''
        },
        component: () => import('@/view/report/detail.vue')
      }
    ]
  },
  {
    path: '/role',
    name: 'role',
    meta: {
      hide: true,
      icon: '',
      title: '权限管理'
    },
    component: Main,
    children: [
      {
        path: 'role_manage',
        name: 'role_manage',
        meta: {
          icon: 'md-people',
          title: '权限管理'
        },
        component: () => import('@/view/role/role.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true,
      icon: ''
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true,
      icon: ''
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true,
      icon: ''
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
