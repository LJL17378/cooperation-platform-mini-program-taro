import { View, Image } from '@tarojs/components'

interface DatumProps {
  cover: string
  title: string
  theme: string
}

const Datum: React.FC<DatumProps> = (props) => {
  const { cover, title, theme } = props

  return (
    <View className="datum-card">
      <Image className="datum-card__image" src={cover} mode="aspectFill" />
      <View className="datum-card__title">{title}</View>
      <View className="datum-card__theme-container">
        <Image 
          className="datum-card__theme-icon" 
          src="/image/简介.png" 
          mode="aspectFill" 
        />
        <View className="datum-card__theme">{theme}</View>
      </View>
    </View>
  )
}

export default Datum