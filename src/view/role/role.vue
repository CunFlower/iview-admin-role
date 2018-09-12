<template>
  <div>
    <Form :model="formItem" :label-width="120">
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
        <Col span='16'>
          <FormItem>
              <Button type="primary" @click="handleSearch()">筛选</Button>
              <Button type="error" @click="add" style="margin-left: 8px">添加</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Table border :columns="columns" :data="dataList"></Table>
    <Modal
        v-model="modal"
        :title="modelTitle"
        width="700"
        @on-ok="createUser">
        <Row :gutter="48">
          <Col span="12">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="登录邮箱" prop="mail">
                  <Input v-model="formValidate.mail" placeholder="请输入有效邮箱" ref="mail" :disabled="isMail"></Input>
              </FormItem>
              <FormItem label="商户权限" prop="partner">
                  <Select v-model="formValidate.partner" placeholder="请选择商户权限" multiple @on-change="changePartner(formValidate.partner)">
                      <Option v-for="(item, index) in parterList" :value="item.id" :key="index">{{ item.name }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="角色" prop="role">
                  <RadioGroup v-model="formValidate.role">
                      <Radio label="1">普通用户</Radio>
                      <Radio label="2">管理员</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="" prop="" v-if="isReset">
                  <Button type="primary" @click="reset">重置密码</Button>
              </FormItem>
          </Form>
          </Col>
          <Col span="12">
            <Tree :data="treeData" show-checkbox multiple @on-check-change="choiceAll" ref="tree"></Tree>
          </Col>
        </Row>
        <div slot="footer">
          <Button type="primary" size="large" @click="createUser">确认修改</Button>
        </div>
    </Modal>
    <Modal
        v-model="modalReset"
        :title="modalResetTitle"
        width="700"
        @on-ok="resetPassword">
        <Row :gutter="48">
          <Col span="20">
            <Form ref="formReset" :model="formReset" :rules="ruleReset" :label-width="80">
              <FormItem label="登录邮箱" prop="mail">
                  <Input v-model="formValidate.mail" placeholder="请输入有效邮箱" ref="mail" :disabled="isMail"></Input>
              </FormItem>
              <FormItem label="原始密码" prop="oldPassword">
                  <Input type="password" v-model="formReset.oldPassword"></Input>
              </FormItem>
              <FormItem label="设置密码" prop="passwd">
                  <Input type="password" v-model="formReset.passwd" placeholder="只能包含字母、数字和标点符号至少2种"></Input>
              </FormItem>
              <FormItem label="确认密码" prop="passwdCheck">
                  <Input type="password" v-model="formReset.passwdCheck"></Input>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <div slot="footer">
          <Button type="primary" size="large" @click="resetPassword">重置密码</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { filterTree } from '@/libs/util'
import md5 from 'js-md5'
export default {
  name: 'role',
  data () {
    const validatePass = (rule, value, callback) => {
      let regex = new RegExp('(?![,:;#%.+*-]+$)(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)^.{6,50}$')
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!regex.test(value)) {
        callback(new Error('只能包含字母、数字和标点符号至少2种'))
      } else {
        if (this.formReset.passwdCheck !== '') {
          this.$refs.formReset.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formReset.passwd) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      modalReset: false,
      modalResetTitle: '重置密码',
      formReset: {
        oldPassword: '',
        passwd: '',
        passwdCheck: ''
      },
      ruleReset: {
        oldPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ],
        passwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { required: true, validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      is: false,
      treeData: [],
      modal: false,
      modelTitle: '创建用户',
      formValidate: {
        mail: '',
        partner: [],
        role: ''
      },
      ruleValidate: {
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        partner: [
          { required: true, type: 'array', min: 1, message: '请选择商户权限', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      },
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
                  size: 'small',
                  disabled: (params.row.status !== '正常' ? 'disabled' : false) || (params.row.userId === this.$store.getters.userInfo.userId ? 'disabled' : false)
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.edit(params.index)
                  }
                }
              }, params.row.status !== '正常' ? '未激活' : '编辑'),
              h('Button', {
                props: {
                  type: 'default',
                  size: 'small',
                  disabled: params.row.userId === this.$store.getters.userInfo.userId ? 'disabled' : false
                },
                on: {
                  click: () => {
                    this.delete(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      dataList: [],
      parterList: [],
      menuIds: [],
      isReset: false,
      getTreeList: [],
      isMail: false,
      ids: [],
      selects: [],
      editUserId: ''
    }
  },
  methods: {
    ...mapActions(['menuForms', 'userList', 'roleParterList', 'userCreate', 'userDelete', 'roleMenuTreeIds', 'userUpdateBase', 'userUpdateTeall']),
    handleSearch (name) {
      console.log(this.formItem.menuIds)
    },
    getUserList (params) {
      this.userList(params).then(res => {
        if (res.code === 200) {
          this.dataList = res.data.users
        }
      })
    },
    resetPassword () {
      this.$refs.formReset.validate((valid) => {
        if (valid) {
          let obj = {
            userId: this.editUserId,
            prePassword: md5(this.formReset.oldPassword),
            password: md5(this.formReset.passwd)
          }
          this.userUpdateBase(obj).then(res => {
            if (res.code === 200) {
              this.modalReset = false
              this.$Message.info('重置密码成功！')
            }
          })
        } else {
          return false
        }
      })
    },
    createUser () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          let obj = {
            companyIds: this.formValidate.partner,
            menuIds: this.menuIds,
            role: this.formValidate.role,
            createId: this.$store.getters.userInfo.userId,
            userName: this.formValidate.mail
          }
          this.userCreate(obj).then(res => {
            if (res.code === 200) {
              this.modal = false
              this.$Message.info('创建用户成功！')
              this.getUserList(this.listParmas)
            }
          })
        } else {
          return false
        }
      })
    },
    reset () {
      this.modalReset = true
      this.modal = false
      this.$refs.formReset.resetFields()
    },
    choiceAll (data) {
      this.getTreeList = data
      for (let i = 0; i < this.getTreeList.length; i++) {
        this.menuIds.push(this.getTreeList[i].id)
      }
    },
    add () {
      this.$refs.formValidate.resetFields()
      this.modal = true
      this.isReset = false
      this.modelTitle = '创建用户'
      this.formValidate.mail = ''
      this.isMail = false
      this.formValidate.partner = []
      this.formValidate.role = ''
      this.selects = []
      this.ids = []
      this.getTreeMenuList()
    },
    edit (index) {
      this.modal = true
      this.$refs.formValidate.resetFields()
      this.isReset = true
      this.modelTitle = '编辑用户'
      this.formValidate.mail = this.dataList[index].userName
      this.isMail = true
      this.formValidate.partner = this.dataList[index].partnerIds
      this.formValidate.role = this.dataList[index].role === '管理员' ? '2' : '1'
      this.editUserId = this.dataList[index].userId
      this.roleMenuTreeIds(this.dataList[index].userId).then(res => {
        this.ids = res.data
        this.treeData = filterTree(this.treeData, this.ids)
      })
    },
    delete (index) {
      let userId = this.dataList[index].userId
      this.$Modal.confirm({
        title: '确定要删除用户吗？',
        content: '',
        onOk: () => {
          this.userDelete(userId).then(res => {
            if (res.code === 200) {
              this.$Message.info('删除用户成功！')
              this.getUserList(this.listParmas)
            }
          })
        }
      })
    },
    changePartner (data) {
      if (data.includes('0')) {
        this.formValidate.partner = ['0']
      }
    },
    getTreeMenuList () {
      if (localStorage.menuList) {
        const treeList = JSON.parse(localStorage.menuList)
        this.selects = treeList.children
        for (let i = 0; i < this.selects.length; i++) {
          if (this.selects[i].path === '/user') {
            this.selects.splice(i, 1)
          }
        }
        this.treeData = filterTree(this.selects, this.ids)
      }
    }
  },
  mounted () {
    this.getTreeMenuList()
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
    this.roleParterList(this.$store.getters.userInfo.userId).then(res => {
      this.parterList = res.data
    })
  }
}
</script>
