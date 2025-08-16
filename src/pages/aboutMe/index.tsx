import Taro, { useDidShow } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { useState } from 'react'
import NavigationBar from '../../components/navigationbar/NavigationBar'
import CustomTabBar from '../../customer-tab-bar/index'
import Activity from '../../components/Activity/Activity'
import Datum from '../../components/Datum/Datum'
import { useScrollAreaHeight } from '../../hooks/useScrollAreaHeight'
import { getUserInfo, getUserActivities, getDatums } from '../../service/aboutMeService'
import './index.scss'

// 导入所有需要的本地图片
import maleIcon from '../../image/男.svg'
import femaleIcon from '../../image/女.svg'
import unknownGenderIcon from '../../image/性别.svg'
import rightIcon from '../../image/右.svg'
import logoutIcon from '../../image/退出登录.svg'
import myActivityIcon from '../../image/我的活动.png'
import rightRightIcon from '../../image/右_右.svg'
import datumIcon from '../../image/培训资料.png'
import defaultAvatar from '../../image/默认头像.png' // 添加一个默认头像

const AboutMe = () => {
  const scrollHeight = useScrollAreaHeight()
  const [userInfo, setUserInfo] = useState({
    gender: 'UNKNOWN' as 'MALE' | 'FEMALE' | 'UNKNOWN',
    uid: '',
    sid: '',
    realName: '',
    qqAccount: '',
    phoneAccount: '',
    avatarUrl: '',
  })
  const [activities, setActivities] = useState<any[]>([])
  const [datums, setDatums] = useState<any[]>([])

  // 加载数据
  const loadData = async () => {
    try {
      const [userData, activityData, datumData] = await Promise.all([
        getUserInfo(),
        getUserActivities(),
        getDatums(),
      ])
      setUserInfo(userData)
      setActivities(activityData)
      setDatums(datumData)
    } catch (error) {
      console.error('数据加载失败:', error)
    }
  }

  // 页面显示时加载数据
  useDidShow(() => {
    loadData()
  })

  // 处理跳转
  const handleNavigate = (url: string) => {
    Taro.navigateTo({ url })
  }

  // 处理退出登录
  const handleLogout = () => {
    // TODO: 实际项目中需要清除token等操作
    Taro.showToast({
      title: '已退出登录',
      icon: 'success',
      duration: 1500,
      complete: () => {
        Taro.navigateTo({ url: '/pages/login/index' })
      }
    })
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
        style={{ height: `${scrollHeight}px` }}
        scrollY
        className='about-me'
      >
        <View className='about-me__container'>
          {/* 用户信息区域 */}
          <View className='about-me__user-info'>
            <Image
              className='about-me__avatar'
              src={userInfo.avatarUrl || defaultAvatar}
              mode='aspectFill'
            />
            
            <View className='about-me__info-group'>
              <View className='about-me__name-row'>
                <View className='about-me__name-section'>
                  <View className='about-me__name'>{userInfo.realName || '未设置姓名'}</View>
                  {userInfo.gender === 'MALE' && (
                    <Image className='about-me__gender-icon' src={maleIcon} />
                  )}
                  {userInfo.gender === 'FEMALE' && (
                    <Image className='about-me__gender-icon' src={femaleIcon} />
                  )}
                  {userInfo.gender === 'UNKNOWN' && (
                    <Image className='about-me__gender-icon' src={unknownGenderIcon} />
                  )}
                </View>
                
                <View className='about-me__edit-btn' onClick={() => handleNavigate('/pages/editInfo/index')}>
                  <View className='about-me__edit-text'>修改</View>
                  <Image className='about-me__edit-icon' src={rightIcon} />
                </View>
              </View>
              
              <View className='about-me__info-row'>
                <View>学号</View>
                <View className='about-me__info-value'>{userInfo.sid || '未设置学号'}</View>
              </View>
              
              <View className='about-me__contact-row'>
                <View className='about-me__contact-item'>
                  <View>QQ</View>
                  <View className='about-me__contact-value'>{userInfo.qqAccount || '未设置QQ'}</View>
                </View>
                
                <View className='about-me__contact-item'>
                  <View>Tel</View>
                  <View className='about-me__contact-value'>{userInfo.phoneAccount || '未设置电话'}</View>
                </View>
              </View>
            </View>
          </View>
          
          {/* 退出登录按钮 */}
          <View className='about-me__logout-btn' onClick={handleLogout}>
            <View className='about-me__logout-icon-container'>
              <Image className='about-me__logout-icon' src={logoutIcon} />
            </View>
            <View className='about-me__logout-text'>退出登录</View>
          </View>
          
          <View className='about-me__divider' />
          
          {/* 我的活动区域 */}
          <View className='about-me__section-header'>
            <Image className='about-me__section-title' mode='heightFix' src={myActivityIcon} />
            <View className='about-me__more-link' onClick={() => handleNavigate('/pages/myActivity/index')}>
              <View className='about-me__more-text'>查看更多</View>
              <Image className='about-me__more-icon' src={rightRightIcon} />
            </View>
          </View>
          
          <View className='about-me__activities'>
            {activities.length === 0 ? (
              <View className='about-me__empty-tip'>到底啦~</View>
            ) : (
              activities.slice(0, 2).map((item) => (
                <Activity
                  key={item.activity_id}
                  state={item.ongoing}
                  cover={item.coverURL || defaultAvatar} // 使用默认图片作为后备
                  title={item.title}
                  location={item.activity_address}
                  theme={item.classify_name}
                  timeLine={item.activity_date}
                  onClick={() => handleNavigate(`/pages/activityContent/index?id=${item.activity_id}`)}
                />
              ))
            )}
          </View>
          
          {/* 培训资料区域 */}
          <View className='about-me__section-header'>
            <Image className='about-me__section-title' mode='heightFix' src={datumIcon} />
            <View className='about-me__more-link' onClick={() => handleNavigate('/pages/plate/index?type=培训资料')}>
              <View className='about-me__more-text'>查看更多</View>
              <Image className='about-me__more-icon' src={rightRightIcon} />
            </View>
          </View>
          
          <View className='about-me__datums'>
            {datums.length === 0 ? (
              <View className='about-me__empty-tip'>到底啦~</View>
            ) : (
              <View className='about-me__datum-grid'>
                {datums.slice(0, 6).map((item) => (
                  <Datum
                    key={item.id}
                    cover={item.coverURL || defaultAvatar} // 使用默认图片作为后备
                    title={item.title}
                    theme={item.introduction}
                    onClick={() => handleNavigate(`/pages/datumContent/index?id=${item.id}`)}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      
      <CustomTabBar />
    </>
  )
}

export default AboutMe