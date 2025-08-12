import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'

/**
 * 获取页面滚动区域高度（px）
 * 自动计算：屏幕高度 - 状态栏 - 自定义导航栏 - tabBar(100rpx) - 底部操作栏
 */
export function useScrollAreaHeight() {
  const [scrollHeight, setScrollHeight] = useState(0)

  useEffect(() => {
    const systemInfo = Taro.getSystemInfoSync()
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect()

    // 状态栏高度(px)
    const statusBarHeight = systemInfo.statusBarHeight || 0

    // 自定义导航栏高度(px)
    const navigationBarHeight =
      (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height

    // rpx -> px
    const rpxToPx = (rpx: number) => (systemInfo.screenWidth / 750) * rpx

    // TabBar 高度(100rpx -> px)
    const tabBarHeightPx = rpxToPx(100)

    // 底部操作栏高度（通过 safeArea 计算，px）
    let bottomActionBarHeightPx = 0
    if (systemInfo.safeArea) {
      bottomActionBarHeightPx = systemInfo.screenHeight - systemInfo.safeArea.bottom
    }

    // 滚动区域高度(px)
    const heightPx =
      systemInfo.screenHeight -
      statusBarHeight -
      navigationBarHeight -
      tabBarHeightPx -
      bottomActionBarHeightPx

    setScrollHeight(heightPx)
  }, [])

  return scrollHeight
}
