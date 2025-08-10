import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import NavigationBar from '../../components/navigationbar/NavigationBar'
import CustomTabBar from '../../customer-tab-bar/index'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <>
      <NavigationBar
        search={false}
        isBack={false}
        jump={false}
        onSearch={(value) => console.log('Search value:', value)} />
      <View className='page-container'>
        <Text>mainpage</Text>
      </View>
      <CustomTabBar />
    </>
  )
}
