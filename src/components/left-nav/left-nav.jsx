import React, {Component} from 'react'

import {Menu, Icon} from 'antd'
import {NavLink,withRouter} from 'react-router-dom'
import logo from '../../assets/image/logo.png'
import './left-nav.less'

const SubMenu = Menu.SubMenu
const Item = Menu.Item
/*
左侧导航组件
 */
class LeftNav extends Component {
  render() {
    // 当前请求的路径
    const path = this.props.location.pathname
    return (
      <div className='left-nav'>
        <NavLink to='/home' className='logo'>
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </NavLink>

        <Menu mode="inline" theme="dark" defaultSelectedKeys={[path]}>

          <Item key='/home'>
            <NavLink to='/home'>
              <Icon type="home"/>首页
            </NavLink>
          </Item>

          <SubMenu key="/products" title={<span><Icon type="appstore" /><span>商品</span></span>}>

            <Item key='/category'>
              <NavLink to='/category'>分类管理</NavLink>
            </Item>

            <Item key="/product">
              <NavLink to='/product'>商品管理</NavLink>
            </Item>
          </SubMenu>

          <Item>
            <NavLink to='/user'><Icon type='user'/>用户管理</NavLink>
          </Item>

          <Item>
            <NavLink to='/role'>
              <Icon type="safety-certificate" />权限管理</NavLink>
          </Item>

          <SubMenu key="/charts" title={<span><Icon type="line-chart" /><span>图表界面</span></span>}>

            <Item key='/bar'>
              <NavLink to='/charts/bar'>柱形图</NavLink>
            </Item>

            <Item key="/line">
              <NavLink to='/charts/line'>扇形图</NavLink>
            </Item>

            <Item key="/pie">
              <NavLink to='/charts/pie'>折线图</NavLink>
            </Item>

          </SubMenu>
        </Menu>

      </div>
    )
  }
}

//将一个非路由组件包装成一个路由组件
export default withRouter(LeftNav)
