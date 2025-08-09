import Taro, { useDidShow } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import SearchBar from '../SearchBar/SearchBar'
import { useState } from 'react'
import './NavigationBar.scss'
import logo from '../../image/logo.png'
import backIcon from '../../image/back.png'

interface NavigationBarProps {
  search?: boolean
  isBack?: boolean
  jump?: boolean
  value?: string
  type?: string
  plateId?: string
  onSearch?: (value: string) => void
}

const NavigationBar = (props: NavigationBarProps) => {
  const [dimensions, setDimensions] = useState({
    statusBarHeight: 20,
    navigationBarHeight: 44,
    menuButtonHeight: 32,
  })
  
  const [value, setValue] = useState(props.value || '')
  
  useDidShow(() => {
    const systemInfo = Taro.getSystemInfoSync()
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect()
    
    setDimensions({
      statusBarHeight: systemInfo.statusBarHeight || 20,
      navigationBarHeight: 
        (menuButtonInfo.top - systemInfo.statusBarHeight!) * 2 + menuButtonInfo.height,
      menuButtonHeight: menuButtonInfo.height,
    })
  })

  const handleChange = (val: string) => {
    setValue(val)
  }

  const handleSearch = () => {
    if (props.onSearch) {
      props.onSearch(value)
    }
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  const handleFocus = () => {
    if (!props.jump) return
    
    const { type = '', plateId = '' } = props
    
    if (value) {
      Taro.redirectTo({
        url: `/pages/searchPage/searchPage?id=${plateId}&type=${type}`
      })
    } else {
      try {
        Taro.navigateTo({
          url: `/pages/searchPage/searchPage?id=${plateId}&type=${type}`
        })
      } catch (err) {
        console.error('页面跳转失败:', err)
      }
    }
  }

  return (
    <View 
      className="navigation-bar"
      style={{
        height: `${dimensions.navigationBarHeight}px`,
        backgroundColor: 'white',
        marginTop: `${dimensions.statusBarHeight}px`
      }}
    >
      {props.search ? (
        <View 
          className="search-container"
          style={{
            height: `${dimensions.menuButtonHeight}px`,
          }}
        >
          {props.isBack && (
            <Image
              className="icon back-icon"
              src={backIcon}
              onClick={handleBack}
              style={{
                borderRadius: `${dimensions.menuButtonHeight / 2}px`,
                width: `${dimensions.menuButtonHeight - 10}px`,
                height: `${dimensions.menuButtonHeight - 10}px`,
              }}
            />
          )}
          
          {!props.isBack && (
            <Image
              className="icon logo-icon"
              src={logo}
              style={{
                borderRadius: `${dimensions.menuButtonHeight / 2}px`,
                width: `${dimensions.menuButtonHeight}px`,
                height: `${dimensions.menuButtonHeight}px`,
              }}
            />
          )}
          
          <SearchBar
            value={value}
            placeholder="请输入搜索关键词"
            shape="round"
            onChange={handleChange}
            onSearch={handleSearch}
            onFocus={handleFocus}
            style={{
                marginLeft: '40rpx',
            }}
          />
        </View>
      ) : (
        <View 
          className={`non-search-container ${props.isBack ? 'back-class' : 'non-back-class'}`}
          style={{
            height: `${dimensions.menuButtonHeight}px`,
            width: '350rpx',
            borderRadius: `${dimensions.menuButtonHeight / 2}px`,
          }}
        >
          {props.isBack && (
            <Image
              className="icon back-icon"
              src={backIcon}
              onClick={handleBack}
              style={{
                borderRadius: `${dimensions.menuButtonHeight / 2}px`,
                width: `${dimensions.menuButtonHeight - 10}px`,
                height: `${dimensions.menuButtonHeight - 10}px`,
              }}
            />
          )}
          
          {!props.isBack && (
            <>
              <Image
                className="icon logo-icon"
                src={logo}
                style={{
                  borderRadius: `${dimensions.menuButtonHeight / 2}px`,
                  width: `${dimensions.menuButtonHeight}px`,
                  height: `${dimensions.menuButtonHeight}px`,
                }}
              />
              <View className="platform-name">山东大学学生云公益平台</View>
            </>
          )}
        </View>
      )}
    </View>
  )
}

NavigationBar.defaultProps = {
  search: false,
  isBack: false,
  jump: true,
  value: '',
  type: '',
  plateId: '',
}

export default NavigationBar