import { View, Image, Text } from '@tarojs/components'

interface NewsProps {
  title: string
  content: string
  cover: string
  onClick?: () => void;
}

const News: React.FC<NewsProps> = (props) => {
  const { title, content, cover, onClick } = props

  return (
    <View className="news-item" onClick={onClick}>
      <View className="news-item__content">
        <Text className="news-item__title">{title}</Text>
        <Text className="news-item__description">{content}</Text>
      </View>
      <Image className="news-item__cover" src={cover} mode="aspectFill" />
    </View>
  )
}

export default News