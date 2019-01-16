/*
用来发送ajax请求的函数模块
函数的返回值为promise对象
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, method='GET') {

  return new Promise((resolve, reject) => {
    let promise
    // 使用axios执行异步ajax请求
    if(method==='GET') {
      promise = axios.get(url, {params: data})
    } else {
      promise = axios.post(url, data)
    }
    // 如果请求成功了, 调用resolve()
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      console.log(url, error)
      message.error('请求出错了')
    })
  })
}
