import { View, ScrollView, Image, Text, Button, Input } from '@tarojs/components'
import Taro, { useLoad, useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { 
  Divider, 
  ActionSheet, 
  Notify,
  Button as TaroButton
} from '@taroify/core'
import '@taroify/core/divider/style'
import '@taroify/core/action-sheet/style'
import '@taroify/core/notify/style'
import '@taroify/core/button/style'
import rightArrow from '../../image/右.svg'
import placeholderIcon from '../../image/虚位以待.png'
import NavigationBar from '../../components/navigationbar/NavigationBar'
import CustomTabBar from '../../customer-tab-bar/index'
import { useScrollAreaHeight } from '../../hooks/useScrollAreaHeight'
import { getCurrentUserInfo, updateUserInfo, uploadAvatar } from '../../service/userService'

import './index.scss'

export default function EditInfo() {
  const scrollHeight = useScrollAreaHeight()
  
  // 用户信息状态
  const [userInfo, setUserInfo] = useState({
    avatarUrl: placeholderIcon,
    realName: '',
    sid: '',
    gender: 'UNKNOWN',
    qqAccount: '',
    phoneAccount: ''
  })
  
  // 弹窗状态
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [showGenderSheet, setShowGenderSheet] = useState(false)
  const [editType, setEditType] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [tempGender, setTempGender] = useState('UNKNOWN')
  const [notifyOpen, setNotifyOpen] = useState(false)
  const [notifyMessage, setNotifyMessage] = useState('')
  const [notifyType, setNotifyType] = useState<'success' | 'danger'>('success')

  // 加载用户信息
  const loadUserInfo = async () => {
    try {
      const data = await getCurrentUserInfo()
      setUserInfo({
        avatarUrl: data.avatar || placeholderIcon,
        realName: data.realName,
        sid: data.sid,
        gender: data.gender,
        qqAccount: data.qqAccount,
        phoneAccount: data.phoneAccount
      })
      setTempGender(data.gender)
    } catch (error) {
      console.error('获取用户信息失败:', error)
      showNotify('获取用户信息失败', 'danger')
    }
  }

  useLoad(() => {
    console.log('编辑信息页面加载')
    loadUserInfo()
  })

  useDidShow(() => {
    loadUserInfo()
  })

  // 显示通知
  const showNotify = (message: string, type: 'success' | 'danger' = 'success') => {
    setNotifyMessage(message)
    setNotifyType(type)
    setNotifyOpen(true)
    setTimeout(() => setNotifyOpen(false), 2000)
  }

  // 选择头像
  const handleChooseAvatar = async (e: any) => {
    const { avatarUrl } = e.detail
    try {
      // 上传头像
      const res = await uploadAvatar(avatarUrl)
      setUserInfo(prev => ({ ...prev, avatarUrl: res.data.avatarUrl }))
      showNotify('头像更新成功')
    } catch (error) {
      console.error('上传头像失败:', error)
      showNotify('头像上传失败', 'danger')
    }
  }

  // 打开编辑面板
  const openEditSheet = (type: string) => {
    setEditType(type)
    setShowActionSheet(true)
    setInputValue(type === 'QQ' ? userInfo.qqAccount : userInfo.phoneAccount)
  }

  // 确认编辑
  const confirmEdit = () => {
    if (editType === 'QQ') {
      setUserInfo(prev => ({ ...prev, qqAccount: inputValue }))
    } else {
      setUserInfo(prev => ({ ...prev, phoneAccount: inputValue }))
    }
    setShowActionSheet(false)
    setInputValue('')
  }

  // 选择性别
  const selectGender = (gender: string) => {
    setTempGender(gender)
  }

  // 确认性别选择
  const confirmGender = () => {
    setUserInfo(prev => ({ ...prev, gender: tempGender }))
    setShowGenderSheet(false)
  }

  // 保存信息
  const saveInfo = async () => {
    try {
      const res = await updateUserInfo({
        gender: userInfo.gender,
        qqAccount: userInfo.qqAccount,
        phoneAccount: userInfo.phoneAccount
      })
      
      if (res.code === 200) {
        showNotify('保存成功')
        // 实际项目中这里会更新本地存储
      } else {
        showNotify(res.message, 'danger')
      }
    } catch (error) {
      console.error('保存失败:', error)
      showNotify('保存失败，请重试', 'danger')
    }
  }

  // 渲染性别文本
  const renderGenderText = (gender: string) => {
    switch (gender) {
      case 'MALE': return '男'
      case 'FEMALE': return '女'
      default: return '未知'
    }
  }

  return (
    <>
      <NavigationBar 
        isBack={true}
      />
      
      {/* 防止padding导致偏移的包裹层 */}
      <View className="scroll-wrapper">
        <ScrollView
          scrollY
          style={{ height: `${scrollHeight}px` }}
          className="edit-info__scrollview"
        >
          <View className="edit-info">
            <View className="edit-info__card">
              {/* 头像 */}
              <Button 
                className="edit-info__item"
                style={{ border: 0 }}
                plain
                openType="chooseAvatar"
                onChooseAvatar={handleChooseAvatar}
              >
                <Text className="edit-info__label">头像</Text>
                <View className="edit-info__value">
                  <Image 
                    src={userInfo.avatarUrl} 
                    className="edit-info__avatar" 
                  />
                  <Image 
                    src={rightArrow} 
                    className="edit-info__arrow" 
                  />
                </View>
              </Button>
              
              <Divider />
              
              {/* 姓名 */}
              <View className="edit-info__item">
                <Text className="edit-info__label">姓名</Text>
                <Text className="edit-info__text">{userInfo.realName}</Text>
              </View>
              
              <Divider />
              
              {/* 学号 */}
              <View className="edit-info__item">
                <Text className="edit-info__label">学号</Text>
                <Text className="edit-info__text">{userInfo.sid}</Text>
              </View>
              
              <Divider />
              
              {/* 性别 */}
              <View 
                className="edit-info__item" 
                onClick={() => setShowGenderSheet(true)}
              >
                <Text className="edit-info__label">性别</Text>
                <View className="edit-info__value">
                  <Text className="edit-info__text">
                    {renderGenderText(userInfo.gender)}
                  </Text>
                  <Image 
                    src={rightArrow} 
                    className="edit-info__arrow" 
                  />
                </View>
              </View>
              
              <Divider />
              
              {/* QQ */}
              <View 
                className="edit-info__item" 
                onClick={() => openEditSheet('QQ')}
              >
                <Text className="edit-info__label">QQ</Text>
                <View className="edit-info__value">
                  <Text className="edit-info__text">{userInfo.qqAccount}</Text>
                  <Image 
                    src={rightArrow} 
                    className="edit-info__arrow" 
                  />
                </View>
              </View>
              
              <Divider />
              
              {/* 手机号 */}
              <View 
                className="edit-info__item" 
                onClick={() => openEditSheet('手机号')}
              >
                <Text className="edit-info__label">手机号</Text>
                <View className="edit-info__value">
                  <Text className="edit-info__text">{userInfo.phoneAccount}</Text>
                  <Image 
                    src={rightArrow} 
                    className="edit-info__arrow" 
                  />
                </View>
              </View>
              
              <Divider />
              
              {/* 保存按钮 */}
              <View className="edit-info__btn-container">
                <TaroButton 
                  className="edit-info__btn"
                  onClick={saveInfo}
                  block
                >
                  保存
                </TaroButton>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      
      <CustomTabBar />
      
      {/* 编辑弹窗 - 使用 Taroify ActionSheet */}
      <ActionSheet 
        open={showActionSheet}
        onClose={() => setShowActionSheet(false)}
      >
        <ActionSheet.Header>编辑{editType}</ActionSheet.Header>
        <View className="edit-sheet">
          <Input
            className="edit-sheet__input"
            placeholder={`请输入新${editType}`}
            type={editType === '手机号' ? 'number' : 'text'}
            value={inputValue}
            onInput={(e) => setInputValue(e.detail.value)}
          />
        </View>
        <ActionSheet.Action>
          <ActionSheet.Button onClick={() => setShowActionSheet(false)}>取消</ActionSheet.Button>
          <ActionSheet.Button onClick={confirmEdit}>确定</ActionSheet.Button>
        </ActionSheet.Action>
      </ActionSheet>
      
      {/* 性别选择弹窗 - 使用 Taroify ActionSheet */}
      <ActionSheet 
        open={showGenderSheet}
        onClose={() => setShowGenderSheet(false)}
      >
        <ActionSheet.Header>选择性别</ActionSheet.Header>
        <View className="gender-sheet">
          <TaroButton 
            className={`gender-sheet__item ${tempGender === 'MALE' ? 'gender-sheet__item--active' : ''}`}
            onClick={() => selectGender('MALE')}
            block
            variant="text"
          >
            男
          </TaroButton>
          <TaroButton 
            className={`gender-sheet__item ${tempGender === 'FEMALE' ? 'gender-sheet__item--active' : ''}`}
            onClick={() => selectGender('FEMALE')}
            block
            variant="text"
          >
            女
          </TaroButton>
        </View>
        <ActionSheet.Action>
          <ActionSheet.Button onClick={() => setShowGenderSheet(false)}>取消</ActionSheet.Button>
          <ActionSheet.Button onClick={confirmGender}>确定</ActionSheet.Button>
        </ActionSheet.Action>
      </ActionSheet>
      
      {/* 通知组件 */}
      <Notify open={notifyOpen} onClose={() => setNotifyOpen(false)}>
        {notifyMessage}
      </Notify>
    </>
  )
}