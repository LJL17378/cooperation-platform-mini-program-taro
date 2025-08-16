import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import NavigationBar from '../../components/navigationbar/NavigationBar'
import CustomTabBar from '../../customer-tab-bar'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <>
      <NavigationBar
        search={true}
        isBack={false}
        jump={true}
        onSearch={(value) => console.log('Search value:', value)}/>
      <View className='page-container'/>
      <CustomTabBar />
    </>
  )
}
