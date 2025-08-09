import { View, Image } from '@tarojs/components'

interface ActivityProps {
  state: boolean
  cover: string
  title: string
  location: string
  theme: string
  timeLine: string
}

const Activity: React.FC<ActivityProps> = (props) => {
  const { state, cover, title, location, theme, timeLine } = props

  return (
    <View className="activity-container">
      <View className="activity">
        <View className="activity__cover">
          <View 
            className={`activity__badge ${state ? 'activity__badge--active' : 'activity__badge--ended'}`}
          >
            {state ? '进行中' : '已结束'}
          </View>
          <Image className="activity__cover-image" src={cover} mode="aspectFill" />
        </View>
        
        <View className="activity__content">
          <View className="activity__title">{title}</View>
          
          <View className="activity__info-group">
            <View className="activity__info">
              <Image 
                className="activity__icon" 
                src="/image/定位.png" 
                mode="aspectFill" 
              />
              <View className="activity__text">{location}</View>
            </View>
            
            <View className="activity__info">
              <Image 
                className="activity__icon" 
                src="/image/代码分支 (1).png" 
                mode="aspectFill" 
              />
              <View className="activity__text">{theme}</View>
              <View className="activity__separator">|</View>
              <View className="activity__text">{timeLine}</View>
            </View>
          </View>
        </View>
      </View>
      
      {/* 自定义分割线替代 Vant Divider */}
      <View className="activity__divider" />
    </View>
  )
}

export default Activity