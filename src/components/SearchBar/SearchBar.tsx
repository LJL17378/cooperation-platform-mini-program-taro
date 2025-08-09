import { View, Input, Image } from '@tarojs/components'
import { CSSProperties } from 'react'
import './SearchBar.scss'

interface SearchBarProps {
  value: string
  placeholder?: string
  shape?: 'round' | 'square'
  onChange: (value: string) => void
  onSearch: () => void
  onFocus?: () => void
  onBlur?: () => void
  style?: CSSProperties
}

const SearchBar = (props: SearchBarProps) => {
  const {
    value,
    placeholder = '请输入搜索关键词',
    shape = 'square',
    onChange,
    onSearch,
    onFocus,
    onBlur,
    style = {}
  } = props

  // 处理输入变化
  const handleInput = (e: { detail: { value: string } }) => {
    onChange(e.detail.value)
  }

  // 处理键盘确认事件
  const handleConfirm = () => {
    if (value.trim()) {
      onSearch()
    }
  }

  return (
    <View 
      className={`search-bar ${shape}`}
      style={style}
    >
      <View className="search-input-container">
        <Image
          className="search-icon"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTUuNSAxNGgtLjc5bC0uMjgtLjI3QzE1LjQxIDEyLjU5IDE2IDExLjExIDE2IDkuNSAxNiA1LjkxIDEzLjA5IDMgOS41IDNTMyA1LjkxIDMgOS41IDUuOTEgMTYgOS41IDE2YzEuNjEgMCAzLjA5LS41OSA0LjIzLTEuNTdsLjI3LjI4di43OWw1IDQuOTlMMjAuNDkgMTlsLTQuOTktNXptLTYgMEM3LjAxIDE0IDUgMTEuOTkgNSA5LjVTNy4wMSA1IDkuNSA1IDE0IDcuMDEgMTQgOS41IDExLjk5IDE0IDkuNSAxNHoiIGZpbGw9IiM4ODgiLz48L3N2Zz4="
        />
        <Input
          className="input"
          value={value}
          placeholder={placeholder}
          onInput={handleInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onConfirm={handleConfirm}
          confirmType="search"
        />
      </View>
    </View>
  )
}

export default SearchBar