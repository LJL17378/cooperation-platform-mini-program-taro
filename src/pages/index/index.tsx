import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import NavigationBar from '../../components/navigationbar/NavigationBar'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <NavigationBar
        search={false}
        isBack={false}
        jump={false}
        onSearch={(value) => console.log('Search value:', value)}/>
      <Text>you hello!</Text>
    </View>
  )
}
