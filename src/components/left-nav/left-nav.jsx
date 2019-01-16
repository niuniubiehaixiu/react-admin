import React, {Component} from 'react'

import {Menu, Icon} from 'antd'
import {NavLink, withRouter} from 'react-router-dom'
import logo from '../../assets/image/logo.png'

import menuList from "../../config/menuConfig";
import './left-nav.less'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

/*
左侧导航组件
 */
class LeftNav extends Component {

  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (item.children) {
        const subMenu = (
          <SubMenu key={item.key}
                   title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        )
        pre.push(subMenu)
      } else {
        /*
        {
          title: '首页', // 菜单标题名称
          key: '/home', // 对应的path
          icon: 'home', // 图标名称
        }
         */
        const menuItem = (
          <Item key={item.key}>
            <NavLink to={item.key}>
              <Icon type={item.icon}/> {item.title}
            </NavLink>
          </Item>
        )
        pre.push(menuItem)
      }
      return pre
    }, [])
  }

  /*
在第一次render()之前调用
 */
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
    console.log(this.menuNodes)
  }

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
          {this.menuNodes}

          {/*         <Item key='/home'>
            <NavLink to='/home'>
              <Icon type="home"/>首页
            </NavLink>
          </Item>

          <SubMenu key="/products" title={<span><Icon type="appstore" /><span>商品</span></span>}>

            <Item key='/category'>
              <NavLink to='/category'> <Icon type="bars" />分类管理</NavLink>
            </Item>

            <Item key="/product">
              <NavLink to='/product'> <Icon type="tool" /> 商品管理</NavLink>
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
    */}
        </Menu>

      </div>
    )
  }
}

//将一个非路由组件包装成一个路由组件
export default withRouter(LeftNav)
