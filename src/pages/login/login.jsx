import React, {Component} from 'react'

import {Form, Icon, Input, Button} from 'antd';

import './login.less'
import logo from '../../assets/image/logo.png'
import {reqLogin} from "../../api";
import PropTypes from 'prop-types'
import storageUtils from '../../utils/storageUtils'
import MemoryUtils from '../../utils/MemoryUtils'
export default class Login extends Component {

  state = {
    errorMsg: ''
  }
  //登陆请求
  login = async (username, password) => {
    const result = await reqLogin(username, password)
    if (result.status === 0) {
      //登陆成功
      const user = result.data
      //保存user到local
      storageUtils.saveUser(user)
      MemoryUtils.user= user
      //跳转到管理界面
      this.props.history.replace('/')
    } else {
      //登陆失败
      this.setState({
        errorMsg: result.msg
      })
    }
  }

  render() {
    const {errorMsg} = this.state
    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt="logo"/>
          React项目: 后台管理系统
        </div>
        <div className='login-content'>
          <div className='login-box'>
            <div className='error-msg-wrap'>
              <div className={errorMsg ? 'show' : ''}>
                {errorMsg}
              </div>
            </div>
            <div className='title'>用户登陆</div>
            <LoginForm login={this.login}/>
          </div>
        </div>
      </div>
    )
  }
}

/*
包含<Form>被包装组件
 */
class LoginForm extends React.Component {

  static propTypes = {
    login: PropTypes.func.isRequired
  }

  //密码无错误时输出的值
  clickLogin = () => {

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('收集数据表单', values);
        const {username, password} = values
        this.props.login(username, password)
      }

    })
  }
  //密码验证
  checkPassword = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码')
    } else if (value.length < 4 || value.length > 10) {
      callback('密码必须是4~10位之间')
    } else {
      callback()
    }
  }

  render() {

    const {getFieldDecorator} = this.props.form
    return (
      <Form className="login-form">
        <Form.Item>
          {
            getFieldDecorator('username', {
              initialValue: 'admin',
              rules: [
                {type: 'string', required: true, message: '请输入用户名'},
                {min: 4, message: '长度不能少于4位'}
              ]
            })(
              <Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              rules: [{validator: this.checkPassword}]
            })(
              <Input type='password' placeholder='请输入密码' prefix={<Icon type="lock"/>}/>
            )
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.clickLogin}>
            登陆
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

//包装包含<Form>的组件
LoginForm = Form.create()(LoginForm)


