import React, { useEffect, useState, useRef } from 'react'
import { View, Swiper, SwiperItem, Image, ScrollView, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useLoad, useDidShow } from '@tarojs/taro'
import './index.scss'
import NavigationBar from '../../components/navigationbar/NavigationBar'
import CustomTabBar from '../../customer-tab-bar/index'
import { useScrollAreaHeight } from '../../hooks/useScrollAreaHeight'
import newsTitle from '../../image/新闻公告.png'
import rightArrow from '../../image/右.svg' // 添加右箭头图标
import placeholderIcon from '../../image/虚位以待.png' // 添加虚位以待图标
import tzyIcon from '../../image/无背景社徽.png' // 添加唐仲英图标
import moreIcon from '../../image/更多.png' // 添加更多图标

// mock service（见 service/mock.ts）
import { mockFetchCarousel, mockFetchNewsPage } from '../../service/mock'

type NewsItem = {
  id: string | number
  title: string
  introduction?: string
  coverURL?: string
}

type SiteItem = {
  name: string
  icon: string
  site: string
}

export default function Index() {
  const scrollHeight = useScrollAreaHeight()
  const [swiperItems, setSwiperItems] = useState<Array<{ id: string | number; title: string; coverURL: string }>>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [page, setPage] = useState(1)
  const [num] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const [hasLogined, setHasLogined] = useState<boolean>(false)
  const [sites, setSites] = useState<SiteItem[]>([
    {
      name: "唐仲英爱心社",
      icon: tzyIcon, // 使用本地图标
      site: '/pages/plate/plate?type=历史成就'
    }
  ])
  const [emptyNum, setEmptyNum] = useState<number>(2) // 初始为2个空位

  useLoad(() => {
    console.log('Page loaded.')
    fetchCarousel()
    checkLoginStatus()
  })

  // 检查登录状态
  const checkLoginStatus = () => {
    try {
      const token = Taro.getStorageSync('token')
      const uid = Taro.getStorageSync('uid')
      setHasLogined(!!token && !!uid)
      //硬编码检查，记得删
      setHasLogined(true)
      return !!token && !!uid
    } catch (e) {
      console.error('Failed to get storage', e)
      return false
    }
  }

  // 页面显示时更新状态
  useDidShow(() => {
    const isLoggedIn = checkLoginStatus()
    if (isLoggedIn) {
      fetchNewsPage(1)
    }
    
    // 计算空位数
    const newEmptyNum = Math.max(0, 3 - sites.length - 1) // 减去"更多"按钮
    setEmptyNum(newEmptyNum)
  })

  // 获取轮播
  const fetchCarousel = async () => {
    const res = await mockFetchCarousel(4)
    setSwiperItems(res)
  }

  // 拉取新闻分页
  const fetchNewsPage = async (p: number) => {
    if (isLoading || isEnd) return
    setIsLoading(true)
    
    const res = await mockFetchNewsPage(p, num)
    if (res.code === 200) {
      setNews(prev => [...prev, ...res.data.list])
      setPage(prev => prev + 1)
      if (res.isEnd) setIsEnd(true)
    }
    setIsLoading(false)
  }

  // ScrollView 到底触发
  const handleScrollToLower = async () => {
    if (!hasLogined) return
    if (isEnd) return
    await fetchNewsPage(page)
  }

  // 检查内容高度并自动加载
  useEffect(() => {
    let isMounted = true

    const tryFill = () => {
      if (!isMounted || isEnd || isLoading || !hasLogined) return
      
      Taro.createSelectorQuery()
        .select('#content')
        .boundingClientRect((rectResult) => {
          if (!isMounted) return
          
          let contentHeight: number | null = null
          
          if (Array.isArray(rectResult) && rectResult.length > 0) {
            contentHeight = rectResult[0].height
          } else if (rectResult && !Array.isArray(rectResult)) {
            contentHeight = rectResult.height
          }
          
          if (contentHeight !== null && contentHeight < scrollHeight) {
            fetchNewsPage(page).catch(console.error)
          }
        })
        .exec()
    }

    Taro.nextTick(tryFill)

    return () => {
      isMounted = false
    }
  }, [news, scrollHeight, hasLogined, isEnd, isLoading, page])

  // 导航到新闻详情
  const toNews = (id?: string | number) => {
    if (!id) return
    Taro.navigateTo({
      url: `/pages/achievementContent/achievementContent?id=${id}&type=news`
    })
  }

  // 导航到站点
  const navigateToSite = (site: string) => {
    if (hasLogined) {
      Taro.navigateTo({ url: site })
    } else {
      toLogin()
    }
  }

  // 跳转到登录页
  const toLogin = () => {
    Taro.navigateTo({ url: '/pages/login/login' })
  }

  return (
    <>
      <NavigationBar
        search={false}
        isBack={false}
        jump={false}
        onSearch={(value) => console.log('Search value:', value)}
      />

      <ScrollView
        id="root-scroll"
        style={{ height: `${scrollHeight}px` }}
        scrollY
        onScrollToLower={handleScrollToLower}
        lowerThreshold={80}
        className="scrollarea"
      >
        <View id="content" className="page-content">
          {/* 轮播 */}
          <Swiper className="home-swiper" autoplay circular duration={1000}>
            {swiperItems.map((item) => (
              <SwiperItem 
                key={item.id} 
                onClick={() => toNews(item.id)}
                className="swiper-item"
              >
                <View className="swiper-item-inner">
                  <Text className="swiperTitle">{item.title}</Text>
                  <Image 
                    src={item.coverURL} 
                    mode="aspectFill" 
                    className="swiper-image" 
                  />
                </View>
              </SwiperItem>
            ))}
          </Swiper>

          {/* 站点格子 */}
          <View className="site-blank">
            {/* 已有的站点 */}
            {sites.map((site, index) => (
              <View 
                key={index}
                className="site-item" 
                onClick={() => navigateToSite(site.site)}
              >
                <Image className="icon" src={site.icon} mode="heightFix" />
                <View className="site-name">{site.name}</View>
              </View>
            ))}
            
            {/* 虚位以待 */}
            {Array.from({ length: emptyNum }).map((_, index) => (
              <View key={`empty-${index}`} className="site-item">
                <Image className="icon" src={placeholderIcon} mode="heightFix" />
                <View className="site-name">虚位以待</View>
              </View>
            ))}
            
            {/* 更多按钮 */}
            <View className="site-item">
              <Image className="icon" src={moreIcon} mode="heightFix" />
              <View className="site-name">更多</View>
            </View>
          </View>

          {/* 新闻公告标题 */}
          <Image 
            src={newsTitle} 
            style={{ height: '50rpx', width: '200rpx', margin: '20rpx 0 10rpx 25rpx' }} 
            mode="heightFix" 
          />

          {/* 新闻列表 */}
          <View className="indexNews-list">
  {news.map(item => (
    <View 
      key={item.id} 
      className="indexNews-item" 
      onClick={() => toNews(item.id)}
    >
      <View className="indexNews-content">
        <Text className="indexNews-title">{item.title}</Text>
        {item.introduction && (
          <Text className="indexNews-intro">{item.introduction}</Text>
        )}
      </View>
      <Image
        className="indexNews-cover"
        src={item.coverURL || 'https://www.wetools.com/imgplaceholder/800x240'}
        mode="aspectFill"
      />
    </View>
  ))}
</View>

          {/* 底部状态 */}
          <View className="bottom">
            {hasLogined && isLoading && (
              <View className="loading-row">
                <Text>加载中</Text>
              </View>
            )}
            {!hasLogined && (
              <View className="to-login" onClick={toLogin}>
                登录查看更多 <Image src={rightArrow} style={{ height: '25rpx', marginLeft: '10rpx' }} mode="heightFix" />
              </View>
            )}
            {isEnd && <View className="end-tip">到底啦~</View>}
          </View>
        </View>
      </ScrollView>

      <CustomTabBar />
    </>
  )
}