import { View, Image } from '@tarojs/components'
import introductionIcon from '../../image/简介.png'

interface DatumProps {
  cover: string
  title: string
  theme: string
  onClick?: () => void;
}

const Datum: React.FC<DatumProps> = (props) => {
  const { cover, title, theme, onClick } = props

  return (
    <View className="datum-card" onClick={onClick}>
      <Image className="datum-card__image" src={cover} mode="aspectFill" />
      <View className="datum-card__title">{title}</View>
      <View className="datum-card__theme-container">
        <Image 
          className="datum-card__theme-icon" 
          src={introductionIcon}
          mode="aspectFill" 
        />
        <View className="datum-card__theme">{theme}</View>
      </View>
    </View>
  )
}

export default Datum