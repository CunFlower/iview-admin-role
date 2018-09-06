import Main from '@/view/main'
import parentView from '@/components/parent-view'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      hideInMenu: false,
      icon: 'social-buffer',
      title: '数据需求管理'
    },
    component: Main,
    children: [
      {
        path: 'count_to',
        name: 'count_to',
        meta: {
          hideInMenu: false,
          icon: '',
          title: '需求提交'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'list',
        name: 'list',
        meta: {
          hideInMenu: false,
          icon: '',
          title: '需求列表'
        },
        component: () => import('@/view/components/list/list.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      hideInMenu: false,
      icon: 'arrow-graph-up-right',
      title: '报表模块'
    },
    component: Main,
    children: [
      {
        path: 'takeout',
        name: 'takeout',
        meta: {
          hideInMenu: false,
          icon: '',
          title: '外卖'
        },
        component: parentView,
        children: [
          {
            path: 'takeoutsearch',
            name: 'takeoutsearch',
            meta: {
              hideInMenu: false,
              icon: '',
              title: '外卖订单自助查询工具'
            },
            component: () => import('@/view/multilevel/takeout/search.vue')
          },
          {
            path: 'takeoutcube',
            name: 'takeoutcube',
            meta: {
              hideInMenu: false,
              icon: '',
              title: '外卖订单自助查询工具'
            },
            component: () => import('@/view/multilevel/takeout/cube.vue')
          },
          {
            path: 'takeoutservice',
            name: 'takeoutservice',
            meta: {
              hideInMenu: false,
              icon: '',
              title: '外卖订单自助查询工具'
            },
            component: () => import('@/view/multilevel/takeout/service.vue')
          },
          {
            path: 'family_cube',
            name: 'family_cube',
            meta: {
              hideInMenu: false,
              icon: '',
              title: '外卖订单自助查询工具'
            },
            component: () => import('@/view/multilevel/takeout/family_cube.vue')
          }
        ]
      },
      {
        path: 'pay',
        name: 'pay',
        meta: {
          hideInMenu: false,
          icon: '',
          title: '支付'
        },
        component: parentView,
        children: [
          {
            path: 'payboard',
            name: 'payboard',
            meta: {
              hideInMenu: false,
              icon: '',
              title: '支付大盘'
            },
            component: () => import('@/view/multilevel/pay/board.vue')
          },
          {
            path: 'paycube',
            name: 'paycube',
            meta: {
              hideInMenu: false,
              icon: '',
              title: '支付自助查询工具'
            },
            component: () => import('@/view/multilevel/pay/cube.vue')
          }
        ]
      },
      {
        path: 'coupon',
        name: 'coupon',
        meta: {
          hideInMenu: false,
          icon: '',
          title: '券码营销'
        },
        component: parentView,
        children: [
          {
            path: 'couponboard',
            name: 'couponboard',
            meta: {
              hideInMenu: false,
              icon: '',
              title: '券码核销明细报表'
            },
            component: () => import('@/view/multilevel/coupon/board.vue')
          },
          {
            path: 'couponactive',
            name: 'couponactive',
            meta: {
              hideInMenu: false,
              icon: '',
              title: '券码活动运营报表'
            },
            component: () => import('@/view/multilevel/coupon/active.vue')
          }
        ]
      },
      {
        path: 'task',
        name: 'task',
        meta: {
          hideInMenu: false,
          icon: '',
          title: '报表任务'
        },
        component: () => import('@/view/multilevel/task.vue')
      },
      {
        path: 'download',
        name: 'download',
        meta: {
          hideInMenu: false,
          icon: '',
          title: '报表下载'
        },
        component: () => import('@/view/multilevel/download.vue')
      },
      {
        path: 'detail',
        name: 'detail',
        meta: {
          hideInMenu: false,
          icon: '',
          title: '报表查看明细'
        },
        component: () => import('@/view/multilevel/detail.vue')
      }
    ]
  },
  {
    path: '/role',
    name: 'role',
    component: Main,
    meta: {
      hideInMenu: false,
      access: ['admin'],
      icon: 'md-contacts',
      title: '权限管理'
    }
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
