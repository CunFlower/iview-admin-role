<template>
  <div>
    <Form :model="formItem" ref="formValidate" :label-width="120">
      <Row :gutter="16">
        <Col span="8">
          <FormItem label="登录名：">
            <Input v-model="formItem.userName" placeholder=""></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="角色：">
            <Select v-model="formItem.roleId">
              <Option value="1">普通用户</Option>
              <Option value="2">管理员</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="报表权限：">
            <Select v-model="formItem.menuIds" multiple>
              <Option v-for="item in permissionList" :value="item.menuId" :key="item.menuId">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="8">
          <FormItem label="注册时间：">
            <DatePicker type="daterange" :options="options2" placement="bottom-start" placeholder="" style="width: 100%"></DatePicker>
          </FormItem>
        </Col>
        <Col span='8'>
          <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">筛选</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Table border :columns="columns" :data="dataList"></Table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'role',
  data () {
    return {
      formItem: {
        userName: '',
        roleId: '',
        menuIds: []
      },
      permissionList: [],
      options2: {
        shortcuts: [
          {
            text: '1 周',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          },
          {
            text: '1 个月',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            }
          },
          {
            text: '3 个月',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [start, end]
            }
          }
        ]
      },
      beginDate: '',
      endDate: '',
      pageIndex: 1,
      pageSize: 10,
      listParmas: {},
      columns: [
        {
          title: '用户名',
          key: 'userName'
        },
        {
          title: '角色',
          key: 'role'
        },
        {
          title: '数据权限',
          key: 'partnerNames'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, 'View'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ],
      dataList: []
    }
  },
  methods: {
    ...mapActions(['menuForms', 'userList']),
    handleSubmit (name) {
      console.log(this.formItem.menuIds)
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    getUserList (params) {
      this.userList(params).then(res => {
        console.log(1, res)
        if (res.code === 200) {
          this.dataList = res.data.users
        }
      })
    }
  },
  mounted () {
    this.menuForms().then(res => {
      this.permissionList = res
    })
    this.listParmas = {
      beginDate: this.beginDate,
      endDate: this.endDate,
      menuIds: this.formItem.menuIds,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      roleId: this.formItem.roleId,
      userName: this.formItem.userName,
      userId: this.$store.getters.userInfo.userId
    }
    this.getUserList(this.listParmas)
  }
}
</script>
