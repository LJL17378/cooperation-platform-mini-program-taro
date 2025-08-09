import { View, Image } from '@tarojs/components'

interface AchievementProps {
  cover: string
  title: string
  time: string
}

const Achievement: React.FC<AchievementProps> = (props) => {
  const { cover, title, time } = props

  return (
    <View className="achievement-card">
      <Image className="achievement-card__img" src={cover} mode="aspectFill" />
      <View className="achievement-card__info">
        <View className="achievement-card__title">{title}</View>
        <View className="achievement-card__time">{time}</View>
      </View>
    </View>
  )
}

export default Achievement