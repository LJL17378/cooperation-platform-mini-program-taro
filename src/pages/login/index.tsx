import Taro, { useRouter, } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, ScrollView, Input, Button, Image } from '@tarojs/components'
import { useScrollAreaHeight } from '../../hooks/useScrollAreaHeight'
import { login } from '../../service/loginService'
import './index.scss'

// 导入本地图片资源
import backgroundImage from '../../image/背景，原图有点偏下，可以适当调整.jpg'
import logoImage from '../../image/logo.png'
import userIcon from '../../image/人.png'
import passwordIcon from '../../image/密码.png'

export default function Login() {
  const scrollHeight = useScrollAreaHeight()
  const [sid, setSid] = useState('')
  const [pwd, setPwd] = useState('')
  const router = useRouter()

  // 处理登录
  const handleLogin = async () => {
    try {
      const res = await login({ sid, password: pwd })
      if (res.code === 200) {
        // 存储用户数据
        Taro.setStorageSync('token', res.data.token)
        Taro.setStorageSync('user', res.data.user)
        
        // 跳转到首页
        Taro.switchTab({ url: '/pages/index/index' })
      } else {
        Taro.showToast({ title: res.message, icon: 'none' })
      }
    } catch (error) {
      Taro.showToast({ title: '登录失败，请重试', icon: 'none' })
    }
  }

  // 检查登录状态 (页面显示时)
  useEffect(() => {
    if (Taro.getStorageSync('token')) {
      Taro.switchTab({ url: '/pages/index/index' })
    }
    
    // 处理路由参数 (页面加载时)
    if (router.params && router.params.forbbiden) {
      Taro.showToast({ title: '登录状态失效，请重新登录', icon: 'none' })
    }
  }, [])

  return (
    <View className="login-page">
      {/* 背景图片 - 使用导入的本地图片 */}
      <Image 
        className="login-page__background" 
        src={backgroundImage} 
      />
      
      <ScrollView
        scrollY
        style={{ height: `${scrollHeight}px` }}
        className="login-page__scrollview"
      >
        <View className="login-page__container">
          {/* Logo - 使用导入的本地图片 */}
          <Image
            className="login-page__icon"
            src={logoImage}
          />
          
          {/* 输入区域 */}
          <View className="login-page__input-group">
            <View className="login-page__input-item">
              {/* 用户图标 - 使用导入的本地图片 */}
              <Image
                className="login-page__input-icon"
                src={userIcon}
              />
              <Input
                className="login-page__input"
                type="number"
                placeholder="请输入学号"
                placeholderClass="login-page__placeholder"
                onInput={(e) => setSid(e.detail.value)}
              />
            </View>
            
            <View className="login-page__input-item">
              {/* 密码图标 - 使用导入的本地图片 */}
              <Image
                className="login-page__input-icon"
                src={passwordIcon}
              />
              <Input
                className="login-page__input"
                password
                placeholder="请输入密码"
                placeholderClass="login-page__placeholder"
                onInput={(e) => setPwd(e.detail.value)}
              />
            </View>
          </View>
          
          {/* 提示信息 */}
          <View className="login-page__tip">
            <View className="login-page__tip-asterisk">*</View>
            <View className="login-page__tip-content">
              <View>请使用统一认证登录</View>
              <View>登录pass.sdu.edu.cn可进行认证</View>
            </View>
          </View>
          
          {/* 登录按钮 */}
          <Button
            className="login-page__button"
            onClick={handleLogin}
          >
            登录
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}