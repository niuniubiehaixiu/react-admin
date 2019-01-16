import React, {Component} from 'react'

import {reqWeather} from '../../api'
import {formateDate} from '../../utils/utils'
import {Col,Row,Modal} from "antd";
import {withRouter} from 'react-router-dom'
import MemoryUtils from '../../utils/MemoryUtils'
import storageUtils from '../../utils/storageUtils'
import './header.less'


/*
头部组件
 */
 class Header extends Component {

  state = {
    sysTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }

  //发异步请求获取天气
  grtWeather = async () => {
    const {dayPictureUrl,weather} = await reqWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }
  //更新时间
  getSysTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        sysTime: formateDate(Date.now())
      })
    }, 1000)
  }

  //退出登陆
  logout = () =>{
    Modal.confirm({
      content: '您确定要退出吗？',
      onOk:()=> {
        console.log('OK')
        //移出保存的user
        storageUtils.removeUser()
        MemoryUtils.user={}
        //跳转到login界面
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel')
      },
    });
  }

  componentDidMount() {
    this.getSysTime()
    this.grtWeather()
  }

  componentWillmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const {sysTime,dayPictureUrl,weather} = this.state
    //得到当前用户
    const user = MemoryUtils.user
    return (
      <div className='header'>
        <Row className='header-top'>
          <span>欢迎，{user.username}</span>
          <a href="javascript: " onClick={this.logout}>退出</a>
        </Row>
        <Row className='breadcrumb'>
          <Col span={4} className='breadcrumb-title'>首页</Col>
          <Col span={20} className='weather'>
            <span className='date'>{sysTime}</span>
            <span className='weather-img'>
              <img src={dayPictureUrl} alt="weather"/>
            </span>
            <span className='weather-detail'>
              {weather}
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}

/*
包装路由
 */
export default withRouter(Header)