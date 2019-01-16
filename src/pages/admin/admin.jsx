import React, {Component} from 'react'

import MemoryUtils from '../../utils/MemoryUtils'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Row, Col} from 'antd'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Home from '../home/home'
import Category from '../products/category/category'
import Product from '../products/product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar/bar'
import Line from '../charts/line/line'
import Pie from '../charts/pie/pie'
import './admin.less'

export default class Admin extends Component {
  render() {
    //检查用户是否登陆
    const user = MemoryUtils.user
    if (!user || !user._id) {
      return <Redirect to='/login'/>
    }
    return (
      <Row className="container">
        <Col span={4}>
          <LeftNav/>
        </Col>
        <Col span={20} className="main">
          <Header/>
          <div className='content'>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home'/>
            </Switch>
          </div>
          <Footer/>
        </Col>
      </Row>


    )
  }
}