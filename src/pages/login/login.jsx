import React, {Component} from 'react'

import {Form, Input, Icon, Button} from 'antd'
import logo from '../../assets/images/logo.png'
import './login.less'
const Item = Form.Item

export default class Login extends Component {

    render() {
        return (
            <div className='login'>
                <div className='login-header'>
                    <img src={logo} alt="logo"/>
                    React项目: 后台管理系统
                </div>

                <div className='login-content'>
                    <div className='login-box'>
                        <div className="title">用户登陆</div>
                        <LoginForm/>
                    </div>
                </div>
            </div>
        )
    }

}

/*
包含From组件
 */
class LoginForm extends React.Component {
    render() {
        return (
          <Form className='login-form'>
              <Item>
                  <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
              </Item>
              <Item>
                  <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
              </Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                  登陆
              </Button>
          </Form>
        )
    }
}



